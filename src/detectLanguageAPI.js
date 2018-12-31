import axios from 'axios';
import db from './dbConnection';

const insertIntoDb = (decodedText) => {
  db.query(`INSERT INTO inputtext VALUES ('${decodedText}')`, {
    type: db.QueryTypes.INSERT,
  });
};

const detectionByAPI = (decodedText) => {
  const AuthStr = 'Bearer 14918d74095aa249c7feef3e30c244ae';
  return new Promise((resolve, reject) => {
    axios
      .get('https://ws.detectlanguage.com/0.2/detect', {
        headers: { Authorization: AuthStr },
        params: { q: decodedText },
      })
      .then((result) => {
        const resultlang = result.data.data.detections[0].language;
        return resolve(resultlang);
      })
      .catch(error => reject(error));
  });
};
const fullLanguage = resultFromAPI => new Promise((resolve, reject) => {
  db.query(`SELECT fullform FROM language where abbr='${resultFromAPI}'`, {
    type: db.QueryTypes.SELECT,
  })
    .then(fullform => resolve(fullform))
    .catch(error => reject(error));
});

const insertionAndDetection = async (decodedText) => {
  try {
    insertIntoDb(decodedText);
    const apiResult = await detectionByAPI(decodedText);
    const fulllang = await fullLanguage(apiResult);
    return fulllang;
  } catch (error) {
    return error;
  }
};
export default insertionAndDetection;
