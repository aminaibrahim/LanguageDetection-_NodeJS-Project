import searchKeyword from './searchKeywordAPI';

const search = (req, res) => {
  const keywordToSearch = req.query.searchkey;
  if (keywordToSearch === '') {
    res.send('No Input Given');
  } else {
    searchKeyword(keywordToSearch)
      .then(result => res.send(result))
      .catch((error) => {
        res.status(500).send(`Error${error.message}`);
      });
  }
};
export default search;
