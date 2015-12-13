var mongoose    =   require("mongoose");
var mongoSchema =   mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/marketIntel');

var domainSchema = new mongoSchema ({
    "_id" : Number,
    "name" : String
});

module.exports =  mongoose.model('domains', domainSchema);
