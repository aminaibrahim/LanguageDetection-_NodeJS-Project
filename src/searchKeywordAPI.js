import db from './dbConnection';

const query = keywordToSearch => new Promise((resolve, reject) => {
  db.query(`SELECT  text FROM inputtext Where text LIKE '%${keywordToSearch}%' `, {
    type: db.QueryTypes.SELECT,
  })
    .then(result => resolve(result))
    .catch(error => reject(error));
});
const resultFormating = (keywordToSearch, searchResultsFromDb) => {
  if (searchResultsFromDb.length) {
    const arrayOfObjects = searchResultsFromDb.map((result) => {
      const flag = result.text.split(keywordToSearch).length - 1;
      const occurance = {
        textString: result.text,
        count: flag,
      };
      return occurance;
    });
    arrayOfObjects.sort((a, b) => b.count - a.count);
    const map1 = arrayOfObjects.map(i => i.textString);

    return map1;
  }
  return 'No matches found';
};
const keywordSearch = async (keywordToSearch) => {
  try {
    const resultFromQuery = await query(keywordToSearch);
    const finalResult = await resultFormating(keywordToSearch, resultFromQuery);
    return finalResult;
  } catch (error) {
    return error;
  }
};
export default keywordSearch;
