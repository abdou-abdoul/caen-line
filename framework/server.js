var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

// npm install socket.io express socket.io-client
var express = require('express');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const dbUrl = 'mongodb://127.0.0.1:27017';

// Database Name
//const dbName = 'rioultf_bd';
const dbName = 'dbMongo';

// Create a new MongoClient
const client = new MongoClient(dbUrl);

client.connect(function (err) {
  assert.equal(err, null);
  console.log("Connected correctly to server");
});

const findDocuments = function (db, col, query, s, callback) {
  // Get the documents collection
  const collection = db.collection(col);
  // Find some documents
  collection.find(query).sort(s).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

app.get('', function (req, res) {
  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);

  fs.readFile(__dirname + '/web/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + page);
      }
      console.log('sending page ' + page);
      res.end(data);
    });

  // sending response OK
});


app.get('/*', function (req, res) {
  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);

  fs.readFile(__dirname + '/web/' + page,
    function (err, data) {
      if (err) {
        res.writeHead(302, {
          'Location': '/'
          //add other headers here...
        });
        res.end();
      }
      console.log('sending page ' + page);
      res.end(data);
    });

  // sending response OK
});

var port = 8080;
console.log("listening to " + port);
var io = require('socket.io').listen(app.listen(port), { log: true });

// when the client is ready
io.sockets.on('connection', function (socket) {
  socket.on('ready', function (data) {
    console.log('received', 'ack');
    socket.emit("message", "welcome !");
  });
  socket.on('menu', function (data) {
    // Use connect method to connect to the Server

    findDocuments(db, 'menu', function (docs) {
      console.log('menu', docs);
      socket.emit('menu', docs);
    });
  })

  socket.on('twistoLine', function (data) {
    console.log('twistoLine----------------------------------------------')
    // Use connect method to connect to the Server
    const db = client.db(dbName)
    findDocuments(db, 'twistoLine', {}, {}, function (docs) {
      console.log('twistoLine', docs)
      socket.emit('twistoLine', docs)
    })
  })

})