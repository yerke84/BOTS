//Configs
var config = require('nconf')
config.file('def', {file: './config/default.json'})

//Create server
var express = require('express');
var app = express();

//Create the virtual hosts
var vhost = require('vhost');
var tlgrmalfabankHost = vhost(config.get("domain_name"), express.static(config.get("dir_path")));

//Use the virtual hosts
app.use(tlgrmalfabankHost);

//Certs
var path = require('path');
var fs = require('fs');
var certOptions = {
  key: fs.readFileSync(path.resolve('cert/server.key')),
  cert: fs.readFileSync(path.resolve('cert/server.crt'))
}

//Start server
var https = require('https')
var httpsServer = https.createServer(certOptions, app);
var port = config.get("myport"); //443, 80, 88, 8443
httpsServer.listen(port, function() {
    console.log('Express server listening on port %d in %s mode.', port, app.settings.env);
});

//Handler
app.get('/', (req, res) => res.send('Hello, World!<br/>' + new Date()));
