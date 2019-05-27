'use strict';

/**
 *  @time 2019-04-26 
 *  @author magbone and 2019internetplus 
 *  The projects @see https://github.com/2019internetplus/mini-program-server
 *  This porjects is lisenced under MIT Lisence
 * 
 * 
 */


 var conn = require("./mysql");
 var user = require("./user");
 
//Test
//Database
// +------------+----------+------+-------+------+------+--------+
// | problem_id |   title  | s_1  |  s_2  |  s_3 |  s_4 | type   |
// +------------+----------+------+-------+------+------+--------+
 
function getTest(){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT * FROM em_test"; //TODO
           
            var params = [];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: result
                  });
                  
            });
       });
}

exports.getTest = getTest;

function insertTest(title, s1, s2, s3, s4, type){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO em_test(title, s_1, s_2, s_3, s_4, type) VALUES(?, ?, ?, ?, ?, ?)"; 
            var params = [title, s1, s2, s3, s4, parseInt(type)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: []
                  });
                  
            });
       });
}

exports.insertTest = insertTest;

//Emotion Datas
// +-------+-------------+-------------+-------------+-------------+--------------+-----------------+------+
// | u_id  | total_value | input_value |  test_value | self_affirm | anti-anxiety | anti-melancholy | time |
// +-------+-------------+-------------+-------------+-------------+--------------+-----------------+------+

function addInputValue(commit, inputValue, openid, message){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql;
            var _message = message || "";
            let date = parseInt(new Date().valueOf() / 1000);
            if(!parseInt(commit)){
                  user.addCommitSession(openid, date);
                  sql = "INSERT INTO em(input_value, message, time, open_id) VALUES(?, ?, ?, ?)"; 
                  var params = [inputValue, _message, date, openid];
                  handler.query(sql, params, function(err, result, fields){
                        if(err) reject(err);
                        valueCompute(openid, date);
                        resolve({
                              state: "Ok",
                              op : "Insert",
                              info: []
                        });
                  
                  });
            }
            else {
                  
                  user.getCommitSession(openid).then((value)=>{
                        
                        if(value == null)resolve({
                              state: "Error",
                              op: 'redis not such key or valye',
                              info: []
                        });
                        sql = "UPDATE em SET input_value = ? , message = ? WHERE time = ? AND open_id = ?";
                        var params = [inputValue, _message, value, openid];
                        handler.query(sql, params, function(err, result, fields){
                              if(err) reject(err);
                              valueCompute(openid, value);
                              resolve({
                                    state: "Ok",
                                    op : "Insert",
                                    info: []
                              });
                  
                  });
                  
                  }).catch(err => {
                        console.log(err);
                        reject(err);
                  })  
            }
       });
}

exports.addInputValue = addInputValue;

function addTestValue(commit, testValue, openid, model1, model2, model3){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = 0;
            let date = parseInt(new Date().valueOf() / 1000);
            if(!parseInt(commit)){
                  user.addCommitSession(openid, date);
                  sql = "INSERT INTO em(test_value, self_affirm, anti_anxiety, anti_melancholy, time, open_id) VALUES(?, ?, ?, ?, ?, ?)";
                  var params = [testValue, model1, model2, model3, date, openid];
                  handler.query(sql, params, function(err, result, fields){
                        if(err) reject(err);
                        valueCompute(openid, date);
                        resolve({
                              state: "Ok",
                              op : "Insert",
                              info: []
                        });
                        
                  });
            }
            else {
                  user.getCommitSession(openid).then(value => {
                        if(!value) return;
                        sql = "UPDATE em SET test_value = ? , self_affirm = ?, anti_anxiety = ?, anti_melancholy = ? WHERE time = ? AND open_id = ?";
                        var params = [testValue, model1, model2, model3, value, openid];
                        
                        handler.query(sql, params, function(err, result, fields){
                              if(err) reject(err);
                              valueCompute(openid, value);
                              resolve({
                                    state: "Ok",
                                    op : "Insert",
                                    info: []
                              });
                              
                        });
                  })
            }
       });
}

exports.addTestValue =  addTestValue;

function getEmotionValue(openid, start, count){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT total_value, input_value, test_value, self_affirm, anti_anxiety, anti_melancholy, message, time FROM em WHERE open_id = ? LIMIT ?,?"
            var params = [openid, parseInt(start), parseInt(count)];
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: result
                  });
                  
            });
      })
}

exports.getEmotionValue = getEmotionValue;

function valueCompute(openid, time){
      var handler = conn.conn;
      var sql = "SELECT input_value, test_value FROM em WHERE open_id = ? AND time = ?"; 
      var params = [openid, time];
      var select = new Promise((resolve, reject) =>{
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                        
            });
       })
      select.then((value) => {
            console.log(value);   
            if(value !== null){
                  let totalValue = 0;
                  if(value.info[0].test_value == null && value.info[0].input_value != null) totalValue = value.info[0].input_value;
                  else if(value.info[0].input_value == null && value.info[0].test_value != null) totalValue = value.info[0].test_value;
                  else if(value.info[0].test_value != null && value.info[0].input_value != null) totalValue = parseInt(0.2 * value.info[0].test_value + 0.8 * value.info[0].input_value); 
                  console.log(totalValue);
                  var handler = conn.conn;
                  let sql = "UPDATE em SET total_value = ? WHERE open_id = ?";
                  var params = [totalValue, openid, time];
            
                  handler.query(sql, params, function(err, result, fields){
                        if(err)console.log(err);
                        else console.log(result);
                  
            });
            }
      }).catch(err =>{
            console.log(err);
      })
}
//Emotion Reports
//Weekly | Monthly | Yearly reports
// +-----------+------------+-----------+-----------------+---------+--------------+
// |   u_id    |  max_value | min_value |  average_value  |  is_pu  | ( reserved)  |
// +-----------+------------+-----------+-----------------+---------+--------------+


//User Info
// +-----------+------------+-------+-----------+------------+
// |   u_id    |  nick_name |  sex  | head_pic  |  join_time |
// +-----------+------------+-------+-----------+------------+

//SoulSoup 
// +--------------+
// |   image_src  |
// +--------------+

 function getSoulSoup(){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT image_src FROM soulsoup"; //TODO
           
            var params = [];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: result
                  });
                  
            });
       });
 }

exports.getSoulSoup = getSoulSoup;

function addSoulSoup(imgSrc){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO soulsoup(image_src) VALUES(?)"; 
            var params = [imgSrc];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: []
                  });
                  
            });
       });
}

exports.addSoulSoup = addSoulSoup;


//Faceback
// +---------+---------+------+
// |  openid | message | time |
// +---------+---------+------+
function addFaceback(openid, message){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            const time = new Date().valueOf();
            var sql = "INSERT INTO faceback_info(openid, message, time) VALUES(?, ?, ?)"; 
            var params = [openid, message, time.toString()];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: []
                  });
                  
            });
       });
}

exports.addFaceback = addFaceback;