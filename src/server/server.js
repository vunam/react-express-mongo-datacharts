var express = require('express');

var app = express();

app.get('/', function(req,res){
	res.send('works!');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
