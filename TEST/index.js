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
