// require express module
var express = require('express');
var app = express();

// require request module
var request = require('request');

// require body-parser module
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));

// set midle wares
app.use(bodyparser.json());

// set view engin
app.set("view engine","ejs");

// require lib
var getAllCurrencies = require('./app/lib/getAllCurrencies');
var updateProfile = require('./app/lib/updateProfile');
var getCryptoProfile = require('./app/lib/getCryptoProfile');

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

app.get("/portfolio",function(req,res){
  var CryptoProfileList
  getCryptoProfile(function(err,result){
    CryptoProfileList=result;
      getAllCurrencies(function(err,result){
        if(err){throw err;}
        else{
          res.render('pages/Portfolio',{
            data: result,
            msg:'',
            profileList: CryptoProfileList
            })// rs.render         
        }//else
      })//getAllCurrencies    
  })//getCryptoProfile
})

app.post("/portfolio",function(req, res){
    console.log(req.body);
    var msg;
    updateProfile(req.body,function(err,result){// update profile with data
      if(err){throw err;}
      else{
        msg = result;
        var CryptoProfileList
        getCryptoProfile(function(err,result){
          CryptoProfileList=result;
            getAllCurrencies(function(err,result){
              if(err){ throw err; }
              else{res.render('pages/Portfolio',{ 
                data: result,
                msg:msg,
                profileList: CryptoProfileList}) }
            })         
        })
      }
    })
})

app.listen(8080,function(err,res){
    console.log('8080 is the magic port')
});


