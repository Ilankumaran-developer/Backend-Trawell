var express = require('express');
var session = require('express-session');

var app = express();



app.listen(process.env.PORT || 3000,function(){
console.log('server started');
})
