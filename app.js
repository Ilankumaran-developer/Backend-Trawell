var express = require('express');
var session = require('express-session');

var app = express();
var dbObject = require('./mongo.json');
var mongo_connect =  require('./mongo_connect')(dbObject);
var auth = require('./controllers/auth')();
config = {};



mongo_connect.connect((datab)=>{

  config.db = datab;


});




app.use('/signup',auth.signup);
app.use('/sayhello',auth.hello);
app.listen(process.env.PORT || 3000,function(){
  console.log('server started');
})
