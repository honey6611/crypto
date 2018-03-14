var MongoClient = require('mongodb').MongoClient;
var Dburl = require('../config/db');

module.exports = (callback)=>{
    MongoClient.connect(Dburl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("crypto");
            dbo.collection("Cryptocurrencies").find().toArray(function(err, result) {
          //console.log(result);
            if(err){
                throw err;
                callback(err, null)  
            }
            else{
                callback(null, result)  
            }
            db.close();
        });
      }); 
}