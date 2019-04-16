"use strict"

const express = require("express");
var app = express();

// route
app.get('/', function(req, res){
      res.send('HelloWorld');
});

var server = app.listen(8081, function(){
      console.log("This server has been starting in http://%s:%s", server.address().address, server.address().port);
})
