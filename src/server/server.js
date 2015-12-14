/* We create a node server for our API and connection with Ayima */

var express = require('express'),
 	 request = require('superagent'),
	 fs = require('fs'),
	 db = require("./database"),
 	 _ = require('underscore');

var app = express();

/* A simple API call to get the domains */
app.get('/get_domains', function(req,res){
	db.domains.find({},function(err,data){
		var response = err ? {"error" : true,"message" : "Error fetching data"} : {"error" : false,"message" : data}; 
		
		res.header("Access-Control-Allow-Origin", "*");
	   res.json(response);
	});
});

/* A simple API to get the records with domain_id as input */
app.get('/get_records/:domain_id', function(req,res){
	var domain_id = req.params.domain_id;
	db.records.find({ domain: domain_id }).sort({'date': -1}).limit(30).sort({'date': 1}).exec(function(err,data){
		var response = err ? {"error" : true,"message" : "Error fetching data"} : {"error" : false,"message" : data}; 

		res.header("Access-Control-Allow-Origin", "*");
	   res.json(response);
	})
});

/* This is used to simulate the server. The API call has a 70% chance of failure */
app.get('/json', function(req,res){
	var text = fs.readFileSync('./marketintel.json').toString();

	res.header("Access-Control-Allow-Origin", "*");
	updateCollections(JSON.parse(text).marketIntel);

	(Math.random() > 0.7) ? res.status(500).send('{}') : res.status(200).send(text);

});

/* Starting our server */
app.listen(3000, function () {
  	console.log('Server listening on port 3000');

	// This method should be run daily using setInterval at midnight.
 	fetchScores (0); 
});

/* This calls the method to fetch our data from Ayima. */
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
	
/* We do a simple loop to update out database. When a score + data + domain entry does not exist it will create the data. */
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