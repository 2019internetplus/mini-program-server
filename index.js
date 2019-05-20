"use strict";

const express = require("express");
var app = express();

var mysqlOp = require("./lib/mysqlop"); 
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
})
var server = app.listen(8081, "127.0.0.1", function(){
      console.log("Server run: http://%s:%s", server.address().address, server.address().port);
});
