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
// +------------+---------+---------+----------+----------+----------+
// |   u_id     |   time  |  value  |  message |  w_value |  t_value |
// +------------+---------+---------+----------+----------+----------+

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