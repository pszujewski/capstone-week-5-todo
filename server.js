var express = require('express');

// This is a change 
// This is another change

var app = express();

app.use(express.static('public'));

app.get('/hi', (req, res) => {
  res.send("Success");
});

app.listen(process.env.PORT || 8080);

exports.app = app;
