
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
  var search = 'select *from notice where bookid='+bookid;
  connection.query(search,function(err,suc){
    if(err){
        console.log('search logs error!!!',err);
    }else{
        console.log('search logds compelete');
        res.json({suc});
    }
  });
  //connection.end();
});
module.exports = router;
