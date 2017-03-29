const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// a change
app.use('/', express.static('public'));

app.get('/hi', (req, res) => {
  res.send("Yoyoyoyo");
});

app.post('/', jsonParser, (req, res) => {
  res.send('post request');
});

app.listen(process.env.PORT || 8080);

exports.app = app;
