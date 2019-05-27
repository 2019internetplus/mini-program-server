"use strict";

const express = require("express");
var app = express();
var bodyParser = require("body-parser");


var mysqlOp = require("./lib/mysqlop"); 
var user = require("./lib/user");
const err =  require("./lib/err");
/***
 *  {
 *          code : int,
 *          message : string,
 *          data:[     
 *                {}
 *          ]      
 *  }
 * 
 * 
 * +-----+-------------------+
 * | code|  message          |
 * +-----+-------------------+
 * | 100 | success           |
 * +-----+-------------------+
 * | 101 | is exsited        |
 * +-----+-------------------+
 * | 404 | source not found  |
 * +-----+-------------------+
 * | 400 | index out of range|
 * +-----+-------------------+
 * | 401 | arguments error   |
 * +-----+-------------------+ 
 * | 402 | sql error         |
 * +-----+-------------------+
 */


// route
/* mini-program */

app.get("/test/v0.1/get", function(req, res){
      mysqlOp.getTest().then((value)=>{
            if(value.state == "Ok"){
                  console.log(value);
                  const response = {
                        code: 100,
                        message: "success",
                        data: value.info
                  };
                  res.end(JSON.stringify(response));
            }
      })
});
app.put("/test/v0.1/add", function(req, res){
      if(req.query.title == undefined || req.query.s1 == undefined || req.query.s2 == undefined ||
            req.query.s3 == undefined || req.query.s4 == undefined || req.query.type == undefined){
                  res.end(err.err401());
            }else{
                  const type = parseInt(req.query.type);
                  if(type < 0 || type > 2){
                        res.end(err.err400());
                  }else{
                        mysqlOp.insertTest(req.query.title, req.query.s1, req.query.s2, req.query.s3, req.query.s4, type).then((value)=>{
                              const response = {
                                    code : "100",
                                    message: "success",
                                    data: []
                              };
                              res.end(JSON.stringify(response));
                        }).catch((e)=>{
                              console.log(e);
                              res.end(err.err402());
                        });
                  }
            }
});

app.get("/soulsoup/v0.1/get", function(req, res){
      mysqlOp.getSoulSoup().then((value)=>{
            if(value.state == "Ok"){
                  console.log(value);
                  const response = {
                        code: 100,
                        message: "success",
                        data: value.info
                  };
                  res.end(JSON.stringify(response));
            }
      })
});
app.put("/soulsoup/v0.1/add", function(req, res){
      if(req.query.imgsrc == undefined){
            res.end(err.err401());
      }else{

            mysqlOp.addSoulSoup(req.query.imgsrc).then((value)=>{
                  if(value.state == "Ok"){
                        console.log(value);
                        const response = {
                              code: 100,
                              message: "success",
                              data: value.info
                        };
                        res.end(JSON.stringify(response));
                  }
            })
      }
      
})


//user login
app.use(bodyParser.json());

app.post("/user/v0.1/login", function(req, res){
      if(req.body.code === undefined){
            res.end(err.err401());
      }else{
            user.userLogin(req.body.code).then(value =>{
                  return user.addNewUser(value);
            }).then(value => {
                  console.log(value);
                  const session = user.addUserSession(value);
                  const resData = {
                        code: 100,
                        message: "success",
                        openid: session.openId,
                        token: session.token
                  };
                  res.end(JSON.stringify(resData));
            }).catch(e => {
                  console.log(e);
                  res.end(err.err403());
            });
      }
      
})

// add input value

//test https://api.xumengli.cn/em/v0.1/addInputValue?token=TOKEN&commit=COMMIT&openid=OPENID&input_value=INPUT_VALUE&message=MESSAGE
app.put('/em/v0.1/addInputValue', function(req, res){
      if(req.query.token === undefined || req.query.commit === undefined || req.query.openid === undefined || req.query.input_value === undefined){
            res.end(err.err401());
      }else{
            user.tokenValid(req.query.openid, req.query.token).then((value)=>{
                  if(value){
                        return mysqlOp.addInputValue(req.query.commit, req.query.input_value, req.query.openid, req.query.message)
                  }else{
                        res.end(err.err405());
                  }
            }).then((value) => {
                  if(value == null) return;
                  if(value.state === "Ok"){
                        const resData = {
                              code: 100,
                              message: 'success',
                              data: []
                        };
                        res.end(JSON.stringify(resData));
                  }
            })
      }
});
// add test value
//test https://api.xumengli.cn/em/v0.1/addTestValue?token=TOKEN&commit=COMMIT&openid=OPENID&test_value=INPUT_VALUE&self_affirm=SELF_AFFIRM&anti_anxiety=ANTI_ANXIETY&anti_melancholy=ANTI_MELANCHAOLY
app.put('/em/v0.1/addTestValue', function(req, res){
      if(req.query.token === undefined || req.query.commit === undefined || req.query.openid === undefined || req.query.test_value === undefined ||
            req.query.self_affirm == undefined || req.query.anti_anxiety == undefined || req.query.anti_melancholy == undefined){
            res.end(err.err401());
      }else{
            user.tokenValid(req.query.openid, req.query.token).then((value)=>{
                  if(value){
                        return mysqlOp.addTestValue(req.query.commit, req.query.test_value, req.query.openid, req.query.self_affirm, req.query.anti_anxiety, req.query.anti_melancholy)
                  }else{
                        res.end(err.err405());
                  }
            }).then((value) => {
                  if(value == null) return;
                  if(value.state === "Ok"){
                        const resData = {
                              code: 100,
                              message: 'success',
                              data: []
                        };
                        res.end(JSON.stringify(resData));
                  }
            })
      }
});

// add faceback
// test https://api.xumengli.cn/faceback/v0.1/add?openid=o7K0Z48OkwZi0LxTInXWGwdWlizM&message=hi&token=1558939295
app.put('/faceback/v0.1/add', function(req, res){
      if(req.query.openid == undefined || req.query.token == undefined || req.query.message == undefined){
            res.end(err.err401());
      }else{
            user.tokenValid(req.query.openid, req.query.token).then((value) => {
                  if(value){
                        return mysqlOp.addFaceback(req.query.openid, req.query.message);
                  }else{
                        res.end(err.err405());
                  }
            }).then((value)=>{
                  if(!value) return;
                  if(value.state === "Ok"){
                        const resData = {
                              code: 100,
                              message: 'success',
                              data: []
                        };
                        res.end(JSON.stringify(resData));
                  }
            })
      }
})

// push report of weekly | monthly while launching app where times.
// test https://api.xumengli.cn/reports/v0.1/push?openid=OPENID&token=TOKEN

app.get('/reports/v0.1/push', function(req, res){

});

// get emation datas from start to count.
// test https://api.xumengli.cn/reports/v0.1/get?openid=OPENID&token=TOKEN&start=START&count=COUNT
app.get('/reports/v0.1/get', function(req, res){
      if(req.query.openid == undefined || req.query.token == undefined || req.query.count == undefined){
            res.end(err.err401());
      }else{
            user.tokenValid(req.query.openid, req.query.token).then(value=>{
                  if(value){
                        return mysqlOp.getEmotionValue(req.query.openid, req.query.start || 0, req.query.count);
                  }else{
                        res.end(err.err405());
                  }
            }).then(value => {
                  if(value.state == "Ok"){
                        const  resData = {
                              code: 100,
                              message: "success",
                              data: value.info
                        };
                        res.end(JSON.stringify(resData));
                  }
            }).catch(e => {
                  console.log(e);
                  res.end(err.err402());
            })
      }
});

app.get('/reports/v0.1/weekly/get', function(req, res){

});

app.get('/reports/v0.1/monthly/get', function(req, res){

});

app.get('/reports/v0.1/all/get', function(req, res){

});
var server = app.listen(8081, "127.0.0.1", function(){
      console.log("Server run: http://%s:%s", server.address().address, server.address().port);
});
 