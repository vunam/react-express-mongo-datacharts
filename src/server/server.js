var express = require('express'),
	 fs = require('fs'),
	 db = require("./database"),
 	 _ = require('underscore');

var app = express();

/*

Since data is updated daily, a fetch should be performed once a day.
App should always connect with server api/db for the best performance.

*/

// Routes

app.get('/', function(req,res){
	res.send('works!');
});

app.get('/json', function(req,res){

	var text = fs.readFileSync('./marketintel.json').toString();
   res.setHeader('Content-Type', 'application/json');
	res.header("Access-Control-Allow-Origin", "*");
	updateCollections(JSON.parse(text).marketIntel);
	res.status(200).send(text);

});

app.get('/get_domains', function(req,res){
	db.domains.find({},function(err,data){
		var response = err ? {"error" : true,"message" : "Error fetching data"} : {"error" : false,"message" : data}; 
	   res.json(response);
	});
});

app.get('/get_records/:domain_id', function(req,res){
	var domain_id = req.params.domain_id;
	console.log(domain_id);
	db.records.find({ domain: domain_id },function(err,data){
		var response = err ? {"error" : true,"message" : "Error fetching data"} : {"error" : false,"message" : data}; 
	   res.json(response);
	});
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});

// Functions

function updateCollections (data) {
	_.each(data, function(dVal, dKey) {
		var dQuery = { '_id': dKey, 'name': dVal.domain }
		db.domains.findOneAndUpdate(dQuery, dQuery, {upsert:true, 'new': true}, function () {});
		
		_.each(dVal.scores, function(rVal, rKey) {
			var rQuery = { 'domain': dKey, 'date': rKey, 'score': rVal }
			db.records.findOneAndUpdate(rQuery, rQuery, {upsert:true, 'new': true}, function () {});
		})
	});
}