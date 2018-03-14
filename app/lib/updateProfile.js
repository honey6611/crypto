var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = require('../config/db');

module.exports =(data,callback)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("crypto");
        if(data.action=='delete'){// delete action
            var deleteItem = { _id: ObjectId(data.cryptoId) };
            dbo.collection("crypto_currency_portfolio").deleteOne(deleteItem, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              callback(null,"1 document deleted")
              db.close();
            });
        }
        else{// update
            var myobj = { 
                cryptoid: data.cryptoId, 
                units: data.units, 
                price:data.price, 
                curr:'USD', 
                user:'Current User',
                last_updated : Math.round((new Date()).getTime() / 1000)
            };
            dbo.collection("crypto_currency_portfolio").insertOne(myobj, function(err, res) {
              if (err) throw err;
              callback(null,"1 document inserted")
              console.log("1 document inserted");
              db.close();
            });
        }

      });
}