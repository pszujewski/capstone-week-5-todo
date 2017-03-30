const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();

// The cors module to implement cors headers

app.use(cors());

// app.use('/', express.static('public'));

let listItems = [];

// Endpoints as of March 29

app.get('/', (req, res) => {
    knex.select('title', 'completed', 'url')
        .from('items')
        .then(results => {
            console.log(results);
            // map over the results & create api repr function 
            return res.json(results);
        });
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
});

app.post('/', jsonParser, (req, res) => {
    const { title } = req.body;
    const ourUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
    knex.insert({
            title: title,
            completed: false,
            url: ourUrl
        })
        .into('items')
        .returning(['id', 'title', 'completed', 'url'])
        .then(result => {

            knex.select('id', 'title', 'completed', 'url')
                .returning('title', 'completed', 'url')
                .from('items')
                .where('id', result[result.length - 1].id)
                .update({ url: ourUrl.concat(result[result.length - 1].id) })
                .then(complete => {
                    return res.status(201).json(result[0]);
                })
        })
        .catch(error => { console.log(error.stack) });
});



app.delete('/', (req, res) => {
    knex('items')
        .del()
        .then(result => {
            return res.status(202).send('delete was successful');
        })
});

// app.put('/', (req, res) => {
//   return res.send('delete was successful');
// });

app.listen(process.env.PORT || 8080);

exports.app = app;