import insertionAndDetection from './detectLanguageAPI';

const callLanguage = async (req, res) => {
  const decodedText = decodeURIComponent(req.query.text);
  try {
    const result = await insertionAndDetection(decodedText);
    return res.send(result);
  } catch (error) {
    return res.send('Cannot get result from API');
  }
};

export default callLanguage;
