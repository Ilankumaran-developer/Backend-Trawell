var mongodb = require('mongodb').MongoClient;
module.exports = (obj)=>{
  var dbCredentials = {};
  dbCredentials = obj;

  var connector = {};

  connector.mapURL = (obj)=>{
    var url ='';
    url=obj.protocol+'://'+obj.user+':'+obj.password+obj.address+':'+obj.port+'/'+obj.database
    console.log(url)
    return url
  }
  connector.connect = (cb) =>{
  connector.url = connector.mapURL(dbCredentials);
    mongodb.connect(connector.url,(err,db)=>{
      if(err)
      {
        console.log('err');
        console.log(err)
        cb(err)
      }
      else{
        
        cb(db);
      }
    })
  }


  return connector;

}
