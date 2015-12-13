var express = require('express'),
	 fs = require('fs');

var app = express();

var db = require("./database");

/*

Since data is updated daily, a fetch should be performed once a day.
App should always connect with server api/db for the best performance.

*/

app.get('/', function(req,res){
	res.send('works!');
});

app.get('/json', function(req,res){

	var text = fs.readFileSync('./marketintel.json').toString();
   res.setHeader('Content-Type', 'application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.status(200).send(text);

});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});