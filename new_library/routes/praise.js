var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'yuanf',
  password: '123456',
  database: 'library'
});
connection.connect();

var openid;
router.get('/', function(req, res, next){
  openid = req.query.openid;
  bookid = req.query.bookid;
  click  = req.query.click;
  var data ;
  var search = 'select *from praise where bookid='+bookid+' and openid=\''+openid+'\'';
  let inert  = 'insert into praise values(null,?,?,1)';
  let info   = [bookid,openid];
  if(click == 0){
   connection.query(search,function(err,suc){
    if(err){
        console.log('search logs error!!!',err);
    }else{
        console.log(suc);
        res.json({suc});
    }
  });
  }else{
   connection.query(inert,info,function(err,suc){
    if(err){
        console.log('praise error!!!',err);
    }else{
        console.log(suc);
        res.json({suc});
    }
  });
 }
  //connection.end();
});
module.exports = router;
