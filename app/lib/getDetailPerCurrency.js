var MongoClient = require('mongodb').MongoClient;
var dburl = require('../config/db');
var request = require("request");
module.exports=(strCrypt,strCur)=>{
    return new Promise(function(resolve,reject){
        options = {
            url: `https://api.coinmarketcap.com/v1/ticker/${strCrypt}/?convert=${strCur}`,
            headers: {
                'User-Agent': 'request'
            }
        };                   
        request.get(options, function(err, resp, body) {
            if (err) {
                reject('');
            } else {
                resolve(body);
            }
        })
    })
}