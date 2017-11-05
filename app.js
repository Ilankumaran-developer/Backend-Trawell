var express = require('express');
var session = require('express-session');
var jwt = require('jsonwebtoken');

var app = express();
var dbObject = require('./mongo.json');
var morgan = require('morgan');
var mongo_connect =  require('./mongo_connect')(dbObject);
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin:true,credentials:true}));
app.set('superSecret','HappyCoding');
config = {};



mongo_connect.connect((datab)=>{
  config.db = datab;
});



var auth = require('./controllers/auth')(config,app);
app.use(morgan('dev'));
app.use('/signup',auth.signup);
app.use('/sayhello',auth.hello);
app.use('/signin',auth.signin);
app.listen(process.env.PORT || 3000,function(){
  console.log('server started');
})
