var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'yuanf',
  password: '123456',
  database: 'library'
});

//var data;
connection.connect();
router.get('/',function(req,res){
        var data;
	bookid = req.query.bookid;
        var search = 'select * from comment,user where comment.bookid='+bookid+' and comment.openid=user.openid';
        connection.query(search,function(err,suc){
		if(err){
                    console.log('erro!');
                    return;
                }else{
                    data = suc;                                                                                                                                 res.json({data});                                                                                                                       }                         //data = suc;
	});
})
module.exports = router;
