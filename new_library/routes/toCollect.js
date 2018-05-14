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
  var data ;
  var insert = 'insert into collect values(null,?,?)';
  var info   = [openid,bookid];
  connection.query(insert,info,function(err,suc){
    if(err){
        console.log('collect error!!!',err);
    }else{
        console.log('collect compelete');
        res.json({suc});
    }
  });
  //connection.end();
});
module.exports = router;
  //~
