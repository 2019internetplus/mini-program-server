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
app.get('/musiclists/v0.1/list', function(req, res){
      
      if(req.query.count == undefined) res.end(err.err401());
      else {
            const start  = req.query.start || 0;
            mysqlOp.getMusicLists(start, req.query.count).then((value)=>{
                        if(value.state == "Ok"){
                              const resData = {
                                    code: 100,
                                    message: "success",
                                    data: value.info
                              };
                              res.end(JSON.stringify(resData));
                        }
            }).catch((e)=>{
                        console.log(e);
                        res.end(err.err402);
            });
      }
});

app.get('/musiclists/v0.1/recommand', function(req, res){
      if(req.query.token == undefined) res.end(err.err401());
      else {
            const testData = {
                  "code": 100,
                  "message": "success",
                  "data": [
                        { 'mlistid': 1000, "src": 'https://xxx.jpg', 'title': 'test'}
                  ]      
            }
            res.end(JSON.stringify(testData));
      }
});

app.get('/movielists/v0.1/recommand', function(req, res){
      if(req.query.token == undefined) res.end(err.err401());
      else {
            const testData = {
                  "code": 100,
                  "message": "success",
                  "data": [
                        { 'mvlistid': 1000, "src": 'https://xxx.jpg', 'title': 'test'}
                  ]      
            }
            res.end(JSON.stringify(testData));
      }
});

app.get('/movielists/v0.1/list', function(req, res){
      if(req.query.start == undefined || req.query.count == undefined) res.end(err.err401());
      else {
            const start  = req.query.start || 0;
            mysqlOp.getMovieLists(start, req.query.count).then((value)=>{
                        if(value.state == "Ok"){
                              const resData = {
                                    code: 100,
                                    message: "success",
                                    data: value.info
                              };
                              res.end(JSON.stringify(resData));
                        }
            }).catch((e)=>{
                        console.log(e);
                        res.end(err.err402);
            });
      }
});

app.get('/movielist/v0.1/details', function(req, res){
      if(req.query.mvlistid == undefined) res.end(err.err401());
      else {
            mysqlOp.getMovieList(req.query.mvlistid).then((value) =>{
                  if(value.state == "Ok"){
                        const resData = {
                              code: 100,
                              messgae: "success",
                              data: value.info
                        };
                        res.end(JSON.stringify(resData));
                  }
           }).catch((e)=>{
                 console.err(e);
                 res.end(err.err402);
           });
      }
});

app.get('/musiclist/v0.1/details', function(req, res){
      if(req.query.mlistid == undefined) res.end(err.err401());
      else {
           mysqlOp.getMusicList(req.query.mlistid).then((value) =>{
                  if(value.state == "Ok"){
                        const resData = {
                              code: 100,
                              messgae: "success",
                              data: value.info
                        };
                        res.end(JSON.stringify(resData));
                  }
           }).catch((e)=>{
                 console.err(e);
                 res.end(err.err402);
           });
      }
});







/* xinyou admin */

// add a new mlist
app.put('/res/mlist/v0.1/new', function(req, res){
      if(req.query.name == undefined) res.end(err.err401());
      else{
            const name = req.query.name || "";
            const desp = req.query.desp || "";
            const post = req.query.post || "";
            const index = req.query.index || 0;
            mysqlOp.addNewMusicList(name, desp, post, index).then((value)=>{
                  if(value.state == "Ok"){
                        const resData = {
                              code: 100,
                              messgae: "success",
                              data: []
                        };
                        res.end(JSON.stringify(resData));
                  }
            }).catch((e)=>{
                  console.log(e);
                  res.end(err.err402());
            });
      }
});

//add a song to mlist
app.put('/res/mlist/v0.1/add', function(req, res){
      if(req.query.mlistid == undefined || req.query.songname == undefined || req.query.singer == undefined) res.end(err.err401());
      else {
            mysqlOp.mlistIsExsit(req.query.mlistid).then((value)=>{
                  if(value.info.length != 0){
                        mysqlOp.addSongToMusicList(req.query.mlistid, req.query.songname, req.query.singer).then((value)=>{
                              if(value.state == "Ok"){
                                   const resData = {
                                    code: 100,
                                    message: "success",
                                    data: []
                                   };
                                   res.end(JSON.stringify(resData));
                              }
                        }).catch((e)=>{
                              console.log(e);
                              res.end(err.err402());
                              
                        });
                  }else{
                        res.end(err.err404());
                  }
            }).catch((e) => {
                  console.log(e);
                  res.end(err.err402());
            });
      }
});


//add a new mvlist
app.put('/res/mvlist/v0.1/new', function(req, res){
      if(req.query.name == undefined) res.end(err.err401());
      else{
            const name = req.query.name || "";
            const desp = req.query.desp || "";
            const post = req.query.post || "";
            const index = req.query.index || 0;
            mysqlOp.addNewMovieList(name, desp, post, index).then((value)=>{
                  if(value.state == "Ok"){
                        const resData = {
                              code: 100,
                              messgae: "success",
                              data: []
                        };
                        res.end(JSON.stringify(resData));
                  }
            }).catch((e)=>{
                  console.log(e);
                  res.end(err.err402());
            });
      }
});


//add a movie into mvlist
app.put('/res/mvlist/v0.1/add', function(req, res){
      if(req.query.mvlistid == undefined || req.query.name == undefined) res.end(err.err401());
      else {

            mysqlOp.mvlistIsExsit(req.query.mvlistid).then((value)=>{
                  if(value.info.length != 0){
                        const directors = req.query.directors || "";
                        const actors = req.query.actors || "";
                        const post = req.query.post || "";
                        
                        mysqlOp.addMovieToMovieList(req.query.mvlistid, req.query.name, directors, actors, post).then((value)=>{
                              if(value.state == "Ok"){
                                   const resData = {
                                    code: 100,
                                    message: "success",
                                    data: []
                                   };
                                   res.end(JSON.stringify(resData));
                              }
                        }).catch((e)=>{
                              console.log(e);
                              res.end(err.err402());
                              
                        });
                  }else{
                        res.end(err.err404());
                  }
            }).catch((e) => {
                  console.log(e);
                  res.end(err.err402());
            });
      }
});



/* kuakua quan */
app.put('/kuakuaquan/v0.1/new', function(req, res){
      if(req.query.context == undefined) res.end(err.err401());
      else{
            const headPic = req.query.headPic || 0;
            const bColor = req.query.bColor || "#000000";
            mysqlOp.addNewKua(req.query.context, bColor, headPic).then((value)=>{
                  if(value.state == "Ok"){
                        const resData = {
                              code: 100,
                              messgae: "success",
                              data: []
                        };
                        res.end(JSON.stringify(resData));
                  }
            }).catch((e)=>{
                  console.log(e);
                  res.end(err.err402());
            });
      }
});


app.get('/kuakuaquan/v0.1/list', function(req, res){
      
      if(req.query.count == undefined) res.end(err.err401());
      else {
            const start  = req.query.start || 0;
            mysqlOp.getKuakuaList(start, req.query.count)
            .then((value) => { return mysqlOp.getKuaLike(value)})
            .then((value) => { return mysqlOp.getKuaCommentMessage(value)})
            .then((value)=>{
                  //console.log(value);
                  const resData = {
                        state: 100,
                        message: "success",
                        data: value.info
                  }
                  res.end(JSON.stringify(resData));
                  
            })
            .catch((e)=>{
                        console.log(e);
                        res.end(err.err402);
            });
      }
});

app.put('/kuakuaquan/v0.1/addlike', function(req, res){
      if(req.query.kua_id == undefined || req.query.nick_id == undefined) res.end(err.err401());
      else {
            mysqlOp.kuaIsExsit(req.query.kua_id)
            .then((value) =>{
                  if(value.info.length != 0)
                  return mysqlOp.likeKua(req.query.kua_id, req.query.nick_id);
                  else {
                        res.end(err.err404);
                  }      
            })
            .then((value)=>{
                  //console.log(value);
                  if(value.state == "Ok"){
                        const resData = {
                              state: 100,
                              message: "success",
                              data: []
                        }
                        res.end(JSON.stringify(resData));
                  }else{
                        const resData = {
                              state: 101,
                              message: "is exsited",
                              data: []
                        }
                        res.end(JSON.stringify(resData));
                  }
                  
                  
            })
            .catch((e)=>{
                        console.log(e);
                        res.end(err.err402);
            });
      }
});

app.put('/kuakuaquan/v0.1/addcomment', function(req, res){
      if(req.query.kua_id == undefined || req.query.comment_message == undefined) res.end(err.err401());
      else {
            mysqlOp.kuaIsExsit(req.query.kua_id)
            .then((value) =>{
                  if(value.info.length != 0)
                  return mysqlOp.addCommentToKua(req.query.kua_id, req.query.comment_message);
                  else {
                        res.end(err.err404);
                  }      
            })
            .then((value)=>{
                  //console.log(value);
                  const resData = {
                        state: 100,
                        message: "success",
                        data: []
                  }
                  res.end(JSON.stringify(resData));
                  
            })
            .catch((e)=>{
                        console.log(e);
                        res.end(err.err402);
            });
      }
});

var server = app.listen(8081, "127.0.0.1", function(){
      console.log("Server run: http://%s:%s", server.address().address, server.address().port);
});
