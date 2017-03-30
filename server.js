const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();

// The cors module to implement cors headers
app.use(cors());

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

app.delete('/', (req, res) => {
  return res.send('delete was successful');
});

app.put('/', (req, res) => {
  return res.send('delete was successful');
});

app.listen(process.env.PORT || 8080);

exports.app = app;
