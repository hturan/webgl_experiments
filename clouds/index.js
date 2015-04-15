var Twit = require('twit');

var twitter = new Twit({
    consumer_key:         'n88QpuAoMxgKaFZXoVFMmxA7C'
  , consumer_secret:      'eva1iKfTz0yTyW7Ezibec7eLQPgWB8gdS7EgEk1NY1oAKaItpv'
  , access_token:         '7691772-j0jH2V3wm4Cc6wXBlpwBPE5oCJzb5w1Zprv5vGUGNW'
  , access_token_secret:  '8Z5EPCmjh0FFZkkbKIa2BARfMwvCQoPsIClvqVuxSw5VS'
});

var stream = twitter.stream('statuses/filter', { locations: '-1.32313,51.710979,-1.175813,51.801998' });
// var stream = twitter.stream('statuses/filter', { locations: '-180,-90,180,90' });
 
stream.on('tweet', function (tweet) {  
  if (client) {
    client.send(tweet.text)
  }
});

var WebSocketServer = require("ws").Server;
var http = require("http");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");

var client = null;

var port = process.env.PORT || 5000;

var serve = serveStatic('./', {'index': ['index.html']});
 
// Create server 
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
});
 
// Listen 
server.listen(port);

var wss = new WebSocketServer({server: server});

var clients = {};

wss.on('connection', function(ws) {
  client = ws;
});