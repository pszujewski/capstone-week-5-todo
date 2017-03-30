const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('public'));

let listItems = [];

// Endpoints as of March 29

app.get('/', (req, res) => {
  return res.json(listItems);
});

app.post('/', jsonParser, (req, res) => {
  const newItem = req.body.title;
  knex.insert({item: newItem}).into('items')
  .then(result => {
    return res.status(201).json(req.body);
  })
  .catch(error => { console.log(error.stack) });
});

app.put('/', (req, res) => {
  return res.send('delete was successful');
});

app.delete('/', (req, res) => {
  return res.send('delete was successful');
});

app.listen(process.env.PORT || 8080);

exports.app = app;
