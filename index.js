"use strict"

const express = require("express");
var app = express();

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
 * | 401 | arguments error    |
 * +-----+-------------------+ 
 */
// route
app.get('/musiclists/v0.1/list', function(req, res){
      
      if(req.query.start == undefined|| req.query.count == undefined) res.end(err.err401());
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

app.get('/movielist/v0.1/details', function(req, res){
      if(req.query.mvlistid == undefined) res.end(err.err401());
      else {
            const testData = {
                  "code": 100,
                  "message": "success",
                  "data": [
                        { 'movieid': 1000, "src": 'https://xxx.jpg', 'moviename': 'test', 'actor': 'test', 'director': 'test'}
                  ]      
            }
            res.end(JSON.stringify(testData));
      }
});

app.get('/musiclist/v0.1/details', function(req, res){
      if(req.query.mlistid == undefined) res.end(err.err401());
      else {
            const testData = {
                  "code": 100,
                  "message": "success",
                  "data": [
                        { 'songid': 1000, "src": 'https://xxx.jpg', 'songname': 'test', 'singer': 'test'}
                  ]      
            }
            res.end(JSON.stringify(testData));
      }
});
var server = app.listen(8081, function(){
      console.log("This server has been starting in http://%s:%s", server.address().address, server.address().port);
})
