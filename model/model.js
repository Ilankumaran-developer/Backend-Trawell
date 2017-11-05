var q = require('q');

exports.insert=(db,tableName,input)=>{
  var deferred = q.defer();


  db.collection(tableName).insert(input,(err,doc)=>{
    if(err)
      {
        deferred.reject(err)
      }
      else{
        deferred.resolve(doc);

      }

  })

  return deferred.promise
}

exports.select = (db,tableName,input) => {
  var deferred = q.defer();
  db.collection(tableName).find(input).toArray((err,data)=>{
    if(err)
    {
      deferred.reject(err)
    }
    else{
      deferred.resolve(data);
    }
  })
  return deferred.promise;
}
