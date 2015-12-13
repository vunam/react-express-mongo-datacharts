var express = require('express'),
	 fs = require('fs'),
	 db = require("./database"),
 	 _ = require('underscore');

var app = express();

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

	var data = JSON.parse(text).marketIntel;

	_.each(data, function(dVal, dKey) {
		var dQuery = { '_id': dKey, 'name': dVal.domain }
		db.domains.findOneAndUpdate(dQuery, dQuery, {upsert:true, 'new': true}, function () {});
		
		_.each(dVal.scores, function(rVal, rKey) {
			var rQuery = { 'domain': dKey, 'date': rKey, 'score': rVal }
			db.records.findOneAndUpdate(rQuery, rQuery, {upsert:true, 'new': true}, function () {});
		})

	});

	res.status(200).send(text);

});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});