var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = (callback)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("local");
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