const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();

// The cors module to implement cors headers
app.use(cors());

// For static files if there is no client provided
// app.use('/', express.static('public'));

app.get('/', (req, res) => {
	knex.select('title', 'completed', 'url', 'order')
   .from('items')
   .then(results => {
   		// map over the results & create api repr function 
  		return res.status(200).json(results);
 		});
});

app.get('/:id', (req, res) => {
	const { id } = req.params;
  knex.select('title', 'completed', 'url', 'id', 'order')
   .from('items') 
   .where('id', id)
   .then(item => {
   	//console.log(item[0]);
    return res.status(200).json(item[0]);
   })
   .catch(err => { 
			console.error(err) 
	 });
});

app.post('/', jsonParser, (req, res) => {
 	const { title, order } = req.body;
  const ourUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  knex.insert({
  	title: title,
		order: order,
  	completed: false,
  	url: ourUrl
  })
  .into('items')
	.returning(['id', 'title', 'completed', 'url', 'order'])
	.then(result => {
		return knex('items')
  		.where('id', result[result.length - 1].id)
    	.update({ url: ourUrl.concat(result[result.length - 1].id) })
    	.returning(['id', 'title', 'completed', 'url', 'order']);
	})
	.then(output => {
		console.log(output);
		return res.status(201).json(output[0]);
	})
	.catch(error => { console.log(error.stack) });
});

app.delete('/:id', (req, res) => {
	const {id} = req.params;
  knex('items')
  	.where('id', id)
    .del()
    .then(result => {
    	console.log(result);
      return res.sendStatus(204).send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/', (req, res) => {
	knex('items')
   .del()
   .then(result => {
    return res.status(202).send('delete was successful');
   })
});

app.patch('/:id', jsonParser, (req, res) => {
	const {title, completed, order} = req.body;
  knex('items')
   .where('id', req.params.id)
   .update({title: title, completed: completed, order: order})
   .then(result => {
	 	return knex.select('title', 'completed', 'url', 'order')
    	.from('items')
    	.where('id', req.params.id)
		})
		.then(item => {
       return res.status(202).json(item[0]);
    }) 
    .catch(error => { console.error(error) });
});

app.listen(process.env.PORT || 8080);

exports.app = app;