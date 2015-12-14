/* 
	Mongoose is used to connect with the MongoDb database
	We create models to create our objects for when we pull the data from the DB
 */

var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/marketIntel');

// Domain Model
var domainSchema = new mongoSchema ({
    "_id" : Number,
    "name" : String
});

var domains = mongoose.model('domains', domainSchema);

// Record Model
var recordSchema = new mongoSchema ({
    "_id" : Number,
    "parent" : Number,
    "date" : Date,
    "score" : String
});

var records = mongoose.model('records', recordSchema);

module.exports = {
	domains : domains,
	records : records
};