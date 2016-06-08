//require express
var express = require('express');
//create a new express app
var app = express();
//require path
var path = require('path');

//FIRST RUN: npm install body-parser --save
//these are needed for post
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded( {extended:false});

//spin up the server
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('server listening on port 3000');
});

//base url
app.get('/', function(req, res){
  console.log('hello from base url get');
  res.writeHead(200);
  res.write('we are in base url');
  res.end();
});

//another url
app.get('/kitties', function(req, res) {
  console.log('hello world from Kitties get');
  res.write('we are in the kitties path');
  res.write('we are still in the kitties path');
  res.end();
});

app.get('/processStuff', function(req, res) {
  //receives a request from the form on getTest.html (rout gettinTestyWithIt)
  res.write('get request recieved:  ' + req.query.catNameIn);
  res.end();
});

//urlencodedParser 'dependency injection' is needed for post
app.post('/processPost', urlencodedParser, function(req,res) {
  //recieves a POST request from the form on getTest.html (route: gettinTestyWithIt)
  res.write('post request recieved: ' + req.body.dogNameIn);
  res.end();
});

app.get('/gettinTestyWithIt', function (req, res) {
  //basic views html file routing
  res.sendFile(path.resolve('views/getTest.html'));
});

//set up "public" folder for static files
app.use(express.static('public'));
