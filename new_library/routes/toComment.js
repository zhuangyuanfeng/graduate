
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
router.post('/', function(req, res, next){
  openid = req.body.bookinfo.openid;
  bookid = req.body.bookinfo.bookid;
  commtext = req.body.bookinfo.commtext;
  var insert = 'insert into comment values(null,?,?,?,now())';
  var info = [openid,bookid,commtext];
  connection.query(insert,info,function(err,suc){
    if(err){
        console.log('error!!!',err)
    }else{
        console.log('compelete');
    }
  });
});
module.exports = router;
