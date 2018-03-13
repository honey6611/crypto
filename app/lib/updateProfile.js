var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports =(data,callback)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { cryptoid: data.cryptoid, units: data.units, price:data.price, curr:'USD' };
        dbo.collection("crypto_currency_portfolio").insertOne(myobj, function(err, res) {
          if (err) throw err;
          callback(null,"1 document inserted")
          console.log("1 document inserted");
          db.close();
        });
      });
}