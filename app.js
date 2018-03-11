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
    res.send("server running");
})


app.listen(8080,function(err,res){
    if(err!=''){console.log("cannot launch server" + err)}
    else{console.log('8080 is the magic port');}
});


