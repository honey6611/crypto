// Script to populate all crypto currencies
// Run it only once as there is no duplicate checking.
// comment below code to populate database
process.exitCode(1)

// require request module
var request = require('request');

// require mongo db
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



    request('https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=3000', function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        //console.log(JSON.parse(body))
        var data = JSON.parse(body)
        var myobj = [];
        for(var i=0; i<data.length; i++){
            //console.log(data[i].name)
            myobj.push({
                id: data[i].id,
                name: data[i].name,
                symbol:  data[i].symbol
            })
        }

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("local");
            dbo.collection("Cryptocurrencies").insertMany(myobj, function(err, res) {
              if (err) throw err;
              console.log("Number of documents inserted: " + res.insertedCount);
              db.close();
            });
          });
      });