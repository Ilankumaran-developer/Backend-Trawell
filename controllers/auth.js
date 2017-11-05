var db = require('../model/model');
var jwt = require('jsonwebtoken');
var md5 = require('md5');

module.exports = function(conf,app){
  var controller = {};

  controller.signup = (req,res)=>{

    var temp = {};
    temp.first_name = req.body.first_name;
    temp.last_name = req.body.last_name;
    temp.email = req.body.email;
    temp.password = md5(req.body.password);
db.select(conf.db,'users',{email:temp.email}).then((resss)=>{
console.log(resss);
  if(resss.length > 0)
  {
    res.send({status:0,response:'email exists'});
  }
  else{
    db.insert(conf.db,'users',temp).then((response)=>{
        res.send({status:1,response:response});
    },(err)=>{
        res.send({status:0,response:err});
    })
  }


  })

  }
  controller.signin = (req,res) => {
    var temp = {};
    temp.email = req.body.email;
    temp.password = md5(req.body.password);
    db.select(conf.db,'users',{email:temp.email}).then((resp)=>{
      if(temp.password == resp[0].password)
      {
        const payload = {
          admin:'Hello'
        };
        try{
        var token = jwt.sign(payload,app.get('superSecret'))
      }catch(e){
        console.log(e)
      }

        resp[0].token = token
          res.send({'status':1,data:resp});
      }
      else{
        res.send({'status':0,'data':'authentication failed'});
      }

    },(err)=>{
      res.send({'status':0,data:err});
    })
  }
  controller.hello = (req,res)=>{
    res.send('Hello world');
  }
  return controller;
}
