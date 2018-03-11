// require express module
var express = require('express');
var app = express();

// require request module
var request = require('request');

// require body-parser module
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: true}));

// set midle wares
app.use(bodyparser.json());

// set view engin
app.set("view engine","ejs");

app.get("/",function(req, res){
    //res.send("server running");
    request('https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=2000', function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        
        res.render('pages/index',{
            data: JSON.parse(body)
        });
      });
      //var data = {body}
})

app.get("/about",function(req,res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("local");
        dbo.collection("Cryptocurrencies").find().toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.render('pages/about',{
            data: result
            })          
          db.close();
        });
      });    

})
app.listen(8080,function(err,res){
    console.log('8080 is the magic port')
});


