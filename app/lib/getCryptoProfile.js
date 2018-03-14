var MongoClient = require('mongodb').MongoClient;
var dburl = require('../config/db');
module.exports = (callback)=>{
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("crypto");
            dbo.collection("crypto_currency_portfolio").find().toArray(function(err, result) {
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