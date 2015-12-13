var express = require('express'),
 	 request = require('superagent'),
	 fs = require('fs'),
	 db = require("./database"),
 	 _ = require('underscore');

var app = express();

/*

Since data is updated daily, a fetch should be performed once a day.
App should always connect with server api/db for the best performance.

*/


// API

app.get('/get_domains', function(req,res){
	db.domains.find({},function(err,data){
		var response = err ? {"error" : true,"message" : "Error fetching data"} : {"error" : false,"message" : data}; 
		
		res.header("Access-Control-Allow-Origin", "*");
	   res.json(response);
	});
});

app.get('/get_records/:domain_id', function(req,res){
	var domain_id = req.params.domain_id;
	db.records.find({ domain: domain_id }).sort('date', -1).execFind(function(err,data){
		var response = err ? {"error" : true,"message" : "Error fetching data"} : {"error" : false,"message" : data}; 

		res.header("Access-Control-Allow-Origin", "*");
	   res.json(response);
	})
});


// Routes

app.get('/json', function(req,res){
	var text = fs.readFileSync('./marketintel.json').toString();

	res.header("Access-Control-Allow-Origin", "*");
	updateCollections(JSON.parse(text).marketIntel);

	//Simulate the current API  for test purposes
	(Math.random() > 0.7) ? res.status(500).send('{}') : res.status(200).send(text);

});

app.listen(3000, function () {
  	console.log('Server listening on port 3000');

	//This should be done daily with setInterval after midnight.
 	fetchScores (0); 
});


// Functions

function fetchScores (retry) {
	request
   .get('http://localhost:3000/json')
   .end( function (err, res) {
     	if(res.status !== 200 && retry < 20)
       	setTimeout( function () {
       		retry++;
         	fetchScores( retry );
      	}, 3000);
    	else ( res.status === 200) 
    		updateCollections(res.body)
   });
}

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