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
router.get('/',function(req,res){
        var data;
        openid = req.query.openid;
	//bookid = req.query.bookid;
//select * from t_book,t_bookType where t_book.bookTypeId=t_bookType.id;
        var search = 'select * from collect,bookinfo where collect.bookid=bookinfo.bookid and collect.openid=\''+openid+'\'';
        connection.query(search,function(err,suc){
                if(err){
                        console.log('erro!');
                        return;
                }else{
                        data = suc;
                        res.json({data});
                }
                //data = suc;
});
                //        //      res.json({data});
                //                //res.end();
})
module.exports = router;
