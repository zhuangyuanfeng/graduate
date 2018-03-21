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
var name,img;
function search(openid) {
  var search = 'select * from user where openid=\''+openid+'\'';
    return new Promise((resolve,reject) => {
      connection.query(search,function (err,suc) {
        console.log(suc);
        console.log(err);
          if(err){
            reject(err);
          }else{
            resolve(suc);
          }
      })
    });
}
router.get('/', function(req, res, next){
  name = req.query.nickName;
  img = req.query.avatarUrl;
  openid = req.query.openid;
  console.log(name);
  console.log(img);
  console.log(openid);
  search(openid).then((list)=>{
    console.log('list',list);
    if(list && list.length == 0){
      let insert = 'insert into user values(\'' + openid + '\',?,?,null)';
      let addinfo = [name,img];
      connection.query(insert,addinfo,function(err,suc){
        if(err){
          console.log(err);
        }else{
          console.log(suc);
        }
      });
    }
    res.send(name+'-----'+img+'------'+openid);

  }).catch((err)=>{
    console.log(err);
  });

});
module.exports = router;
