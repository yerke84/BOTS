/*
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

app.get('/', (req, res) => res.send('Hello World!<br/>' + new Date()))

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(1984);

*/

var express = require("express");

var https = require("https");

var fs = require("fs");

var app = express();

app.get("/", function(req, res){

  res.send("<h1>helloww<h2>\n");

});

var options = {

key: fs.readFileSync("certs/server.key"),

cert: fs.readFileSync("certs/server.crt")

}

var server = https.createServer(options, app);

console.log("Listen to 3443");

server.listen(3443);
