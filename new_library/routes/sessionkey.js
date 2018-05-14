var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var iconv = require("iconv-lite");

var appid,secret,js_code,grant_type;
var sessionkey;

router.get('/', function(req, response, next) {
    //这里获取的是小程序传过来的值
    appid = req.query.appid;
    secret = req.query.secret;
    js_code = req.query.js_code;
    grant_type = req.query.grant_type;
    console.log('js_code:',js_code);

    //将code发给微信的服务器获取openid
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+js_code+'&grant_type='+grant_type;

    var req = https.request(url,(res) => {
        //组成可获取数据
        var datas = [];
        var size = 0;
        res.on('data', (d) => {
            datas.push(d);
            size += d.length;
            process.stdout.write(d);
        });
        res.on('end',function(){
            var buff = Buffer.concat(datas, size);
            var result = iconv.decode(buff, "utf8");
            console.log('sessionkey:',result);
            sessionkey = result;
            response.send(result);
        });
    });
    req.on('error',(e) => {
        console.error(e);
    });
    req.end();
});
module.exports = router;