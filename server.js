const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonParser = bodyParser.json();

require('dotenv').config();

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();

// The cors module to implement cors headers
app.use(cors());

// For static files if there is no client provided
// app.use('/', express.static('public'));

app.get('/', (req, res) => {
	// return all fields except for id
	knex.select('title', 'completed', 'url', 'order')
   .from('items')
   .then(results => {
  		return res.status(200).json(results);
 		})
		.catch(err => { 
			console.error(err);
			return res.status(500).json({message: "Internal server error"}); 
	 });
});

app.get('/:id', (req, res) => {
	const { id } = req.params;
  knex.select('title', 'completed', 'url', 'id', 'order')
   .from('items') 
   .where('id', id)
   .then(item => {
    return res.status(200).json(item[0]);
   })
   .catch(err => { 
			console.error(err);
			return res.status(500).json({message: "Internal server error"});  
	 });
});

app.post('/', jsonParser, (req, res) => {
 	const { title, order } = req.body;
	const	itemUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
	// Ensure that the title in the request payload is valid
	if (title === '' || title === ' '|| typeof title === 'undefined') {
		return res.status(404).json({message: 'Bad request: enter valid item title'});
	} 
  knex.insert({
  	title: title.trim(),
		order: order,
  	completed: false,
  	url: itemUrl
  })
  .into('items')
	.returning(['id', 'title', 'completed', 'url', 'order'])
	.then(result => {
		return knex('items')
  		.where('id', result[result.length - 1].id)
    	.update({ url: itemUrl.concat(result[result.length - 1].id) })
    	.returning(['id', 'title', 'completed', 'url', 'order']);
	})
	.then(output => {
		console.log(output);
		return res.status(201).json(output[0]);
	})
	.catch(error => { 
		console.log(error);
		return res.status(500).json({message: "Internal server error"});  
	});
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
			return res.status(500).json({message: "Internal server error"}); 
    });
});

app.delete('/', (req, res) => {
	knex('items')
   .del()
   .then(result => {
     return res.status(202).send('delete was successful');
   })
	 .catch(err => {
   	 console.log(err);
		 return res.status(500).json({message: "Internal server error"}); 
   });
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
    .catch(error => { 
			console.error(error);
			return res.status(500).json({message: "Internal server error"}); 
		});
});

app.listen(process.env.PORT || 8080);

exports.app = app;