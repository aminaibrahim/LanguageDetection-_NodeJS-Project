import express from 'express';

import fs from 'fs';
import callLanguage from './callLanguageAPI';
import search from './callSearchAPI';

const app = express();

const fileRouter = (req, res, next) => {
  fs.readFile(`./public${req.path}`, 'utf-8', (err, html) => {
    if (err) {
      next();
    } else {
      res.send(html);
    }
  });
};

app.use(fileRouter);

app.get('/detectlanguage', callLanguage);
app.get('/searchkeyword', search);

app.listen(3000, () => {
  console.log('Server started at 3000'); // eslint-disable-line
});
