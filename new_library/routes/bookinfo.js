var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'yuanf',
  password: '123456',
  database: 'library'
});


router.post('/',function(req,res){
  console.log('files:',req.files[0]);
  //var des_file = __dirname + "/images/" + req.files[0].originalname;
  var des_file = '/root/new_library/new_library/public/images' + req.files[0].originalname;
  console.log('--dirname',__dirname);
  console.log('des_file',des_file);
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully',
                   filename:req.files[0].filename
              };
              var filename = req.files[0].filename;
              console.log( response );
              res.send(filename);
          }
       });
   });
});

module.exports = router;





    
