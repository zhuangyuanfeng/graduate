var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// import sql from  'connmysql';
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'yuanf',
  password: '123456',
  database: 'library',
  multipleStatements: true
});

//声明需要操作的全局变量
var bookid,openid,handing,bookname;
connection.connect();

function query(...args) {
  return new Promise((resolve, reject) => {
    args.push(function(err, suc) {
        if(err){
          reject(err);
        }else{
          resolve(suc);
        }
    });
    connection.query.apply(connection, args);
  });
}

router.get('/', function(req, res, next){
 // connection.connect();

  bookid = req.query.bookid;
  openid = req.query.openid;
  bookname = req.query.bookname;
  handing = req.query.handing;
  
  console.log('==========this is global value===========');
  console.log(bookid)
  console.log(openid);
  console.log(handing);
  console.log(bookname);
  console.log('=========================================');
  handing = 1;
  console.log('now handing : ',handing);

  let borrow = 'insert into logs values(null,?,?,?,now(),null)';
  let change = 'update bookinfo set handing=1 where bookid='+bookid;
  console.log(borrow);
  console.log(change);

  let control = [borrow,change];
  let addinfo = [openid,bookid,bookname];

  Promise.all([
    query(borrow, addinfo),
    query(change)
  ]).then(() => {
   console.log('666');
    res.send('handing:'+handing);
  }).catch(function(err){
    console.log(err)
  });

});


module.exports = router;
