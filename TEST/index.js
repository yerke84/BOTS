var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('certs/server.key', 'utf8');
var certificate = fs.readFileSync('certs/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

app.get('/', (req, res) => res.send('Hello World!<br/>' + new Date()) + '\n')

var httpsServer = https.createServer(credentials, app);

var port = 1984;
httpsServer.listen(port, function(){
    console.log(`server started at port ` + port);
});
//Ports currently supported for Webhooks: 443, 80, 88, 8443
//https://tlgrmalfabank.kz:1984
/*
var https = require('https');
var fs = require('fs');
var express = require('express');

var options = {
    key: fs.readFileSync('certs/server.key'),
    cert: fs.readFileSync('certs/server.key'),
    requestCert: false,
    rejectUnauthorized: false
};


var app = express();

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
});
*/
