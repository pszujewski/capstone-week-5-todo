const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.send("Yoyoyoyo");
});

app.post('/', jsonParser, (req, res) => {
  console.log(req.body.title);
});

app.listen(process.env.PORT || 8080);

exports.app = app;
