var MongoClient = require('mongodb').MongoClient;
var dburl = require('../config/db');
var request = require("request");

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
                var options, mval
                for(var i=0; i<result.length; i++) {
                    result[i].totalCost=(parseFloat(result[i].units) * parseFloat(result[i].price)).toFixed(2)
                }
                callback(null, result)  
            }
            db.close();
        });
      }); 
}