'use strict';

var https = require('https');
var iconv = require('iconv-lite');
var redis = require('redis');
var mysql = require('./mysql');


// login configure information, using for login
const info = {
      appId: "##", // mini-program appid
      appSecret: "##" //mini-program appsecret
};

// session configure information, using for login keeping 

const redisInfo = {
      port: 6379, // redis port
      ip: "47.100.233.148" // redis host
};

/**
 * The code from client wx.login()
 * @param {String} code 
 */
function userLogin(code){
      return new Promise((resolve, reject) => {
            const requestUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + info.appId + "&secret=" + info.appSecret + "&js_code=" + code + "&grant_type=authorization_code";
            https.get(requestUrl, function(res){
                  var datas = [];
                  var size = 0;
                  res.on('data', function(data){
                        datas.push(data);
                        size += data.length;
                  });
                  res.on('end', function(){
                        var buff = Buffer.concat(datas, size);
                        const json = iconv.decode(buff, "utf8");
                        resolve(JSON.parse(json));
                  });
            }).on("error", function(err){
                  console.error(err);
                  reject(err);
            })
      });
}

exports.userLogin = userLogin;

function addUserSession(data){
      if(data.session_key === undefined) return;
      var redisClient = redis.createClient(
            redisInfo.port,
            redisInfo.ip
      );
      let token = parseInt(new Date().valueOf() / 1000);
                        redisClient.set(data.openid, token);
                        return {
                              sessionKey: data.session_key,
                              openId: data.openid,
                              token: token, 
                        };
}

exports.addUserSession = addUserSession;


function addCommitSession(openid, time){
      let redisClient = redis.createClient(redisInfo.port, redisInfo.ip);
      redisClient.set(openid + "commit", time);
}

exports.addCommitSession = addCommitSession;

function getCommitSession(openid){
      return new Promise((resolve, reject) => {
            let redisClient = redis.createClient(redisInfo.port, redisInfo.ip);
            redisClient.get(openid + "commit", function(err, v){
                  if(err) reject(err);
                  resolve(v)
            })
      });
}

exports.getCommitSession = getCommitSession;



/**
 * add a new user if it don't exsit.
 * @param {String} value 
 */
function addNewUser(value){
      console.log(value);
      return new Promise((resolve, reject) => {
            if(value === undefined ||  value === null) reject("value is null");
            
            let joinTime = parseInt(new Date().valueOf() / 1000);
            let sql = "INSERT INTO user_info (open_id, join_time) SELECT ?, ? WHERE NOT EXISTS (SELECT open_id FROM user_info WHERE open_id = ?)";
            let params = [value.openid, joinTime.toString(), value.openid];

            let handler = mysql.conn;
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve(value);
                  
            });
      });
}

exports.addNewUser = addNewUser;


function tokenValid(openid, token){
      return new Promise((resolve, reject) => {
            var redisClient = redis.createClient(
                  redisInfo.port,
                  redisInfo.ip
            );
            console.log(openid, token);
            redisClient.get(openid, function(err, v){
                  if(err) reject(err);
                  else{
                        resolve(parseInt(v) === parseInt(token));
                  }
            })
      })
}

exports.tokenValid = tokenValid;