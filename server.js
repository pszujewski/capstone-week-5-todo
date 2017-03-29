const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.send("new attempt");
});

app.post('/', jsonParser, (req, res) => {
  // res.json(req.body);
  const newItem = req.body.title;
  knex.insert({item: newItem}).into('items')
  .then(result => {
    return res.status(201).json(req.body);
  })
  .catch(error => { console.log(error.stack) });
});

app.listen(process.env.PORT || 8080);

exports.app = app;
