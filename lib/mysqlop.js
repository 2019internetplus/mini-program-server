'use strict';

/**
 *  @time 2019-04-26 
 *  @author magbone and 2019internetplus 
 *  The projects @see https://github.com/2019internetplus/mini-program-server
 *  This porjects is lisenced under MIT Lisence
 * 
 * 
 */
/**
 *  XinYou mini-program server mysql operations inculde query, update, delete.
 *  The resouces we recommand or provide as follow. Note that We also provide APIs to work convenicently.
 *  More APIs infomation, please see @file {../index.js}
 *  1. Query the all singLists|movieLists|fictionLists.
 *  2. Query the all songs in singList|movieList|fictionList.
 *  3. Create a new singList|movieList|fictionList.
 *  4. Add new sing|moive|fiction.
 */

 var conn = require("./mysql");

 
 //Database
 // mlist
 // +---------+----------+--------+---------+
 // | mlistid | songname | singer |  songid |
 // +---------+----------+--------+---------+
 // mlist_info
 // +---------+------------+-----------+-------------+-------+
 // | mlistid | mlist_name | mlist_des | mlist_index | post  |
 // +---------+------------+-----------+-------------+-------+
 // mvlist
 // +----------+------+-----------+--------+------+
 // | mvlistid | name | directors | actors | post |
 // +----------+------+-----------+--------+------+
 // mvlist_info
 // +----------+-------------+-------------+-------------+
 // | mvlistid | mvlist_name | mvlist_des | mvlist_index |
 // +----------+-------------+------------+--------------+
 
 /** music list */

/**
 * add a new empty music list
 * @param {String} mListName music list name
 * @param {String} mListDesp music list description
 * @param {String} post music list post
 * @param {Int} index
 */
 function addNewMusicList(mListName, mListDesp, post, mListIndex){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO mlist_info (mlist_name, mlist_des, post, mlist_index) VALUES(?, ?, ?, ?)";
           
            var params = [mListName, mListDesp, post, parseInt(mListIndex)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       });
 }

 exports.addNewMusicList = addNewMusicList;

/**
 *  check the mlist if exsit.
 * @param {Int} mListid 
 */

 function mlistIsExsit(mListid){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT * FROM mlist_info WHERE mlistid = ?";
            
            var params = [parseInt(mListid)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: result
                  });
                  
            });
       }); 
}

exports.mlistIsExsit = mlistIsExsit;
/**
 * add a new song into a music list
 * @param {String} songName song name
 * @param {String} singer
 * @param {Int} mListId target musicList id
 */
 function addSongToMusicList(mListId, songName, singer){
      return new Promise((resolve, reject) => {
            
            var handler = conn.conn;
            var sql = "INSERT INTO mlist (mlistid, songname, singer) VALUES(?, ?, ?) ";
            
            var params = [parseInt(mListId), songName, singer];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       });  
      
      
 }

exports.addSongToMusicList = addSongToMusicList;

/**
 * Remove a song from mlist
 * @param {Int} mListId 
 * @param {Int} songId 
 */
function removeSongFromList(mListId, songId){
      return new Promise((resolve, reject) => {
            
            var handler = conn.conn;
            var sql = "DELETE FROM mlist_info WHERE mlistid = ? and songid = ?";
            
            var params = [parseInt(mListId), parseInt(songId)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Delete",
                        info: result
                  });
                  
            });
       });  
}

exports.removeSongFromList = removeSongFromList;
/**
 * get all songs from a music list by mlistid
 * @param {Int} mListId 
 */

function getMusicList(mListId){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT songname, singer FROM mlist WHERE mlistid = ?";
            
            var params = [parseInt(mListId)];
            
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

exports.getMusicList = getMusicList;

/**
 * list musiclist from start to start + count
 * @param {Int} start 
 * @param {Int} count 
 */
function getMusicLists(start, count){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT mlistid, mlist_name, mlist_des, post FROM mlist_info limit ? offset ? ";
            
            var params = [parseInt(count), parseInt(start)];
            
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: result
                  });
                  
            });
       });
}

exports.getMusicLists = getMusicLists;

/**
 * Modify elements of mlist
 * @param {Int} mListId 
 * @param {String} mListName 
 * @param {String} mListDes 
 * @param {String} post 
 * @param {Int} mListIndex 
 */
function modifyMusicList(mListId, mListName, mListDes, post,mListIndex){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "UPDATE mlist_info SET mlist_name = ?, SET mlist_des = ?, SET post = ?, SET mlist_index = ? WHERE mlistid = ?";
            
            var params = [mListName, mListName, mListDes, post, parseInt(mListIndex), parseInt(mListId)];
            
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: []
                  });
                  
            });
       });
}

exports.modifyMusicList = modifyMusicList;






/* movie list */

/**
 * add new mvlist
 * @param {String} mvListName 
 * @param {String} mvListDesp 
 * @param {String} post 
 * @param {Int} mvListIndex 
 */
function addNewMovieList(mvListName, mvListDesp, post, mvListIndex){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO mvlist_info (mvlist_name, mvlist_des, post, mvlist_index) VALUES(?, ?, ?, ?)";
           
            var params = [mvListName, mvListDesp, post, parseInt(mvListIndex)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       });
}

exports.addNewMovieList = addNewMovieList;

/**
 * mvList if is exsited
 * @param {Int} mvListid 
 */

function mvlistIsExsit(mvListid){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT * FROM mvlist_info WHERE mvlistid = ?";
            
            var params = [parseInt(mvListid)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       }); 
}

exports.mvlistIsExsit = mvlistIsExsit;

/**
 * 
 * @param {Int} mvListId 
 * @param {String} name 
 * @param {String} directors 
 * @param {String} actors 
 * @param {String} post 
 */

function addMovieToMovieList(mvListId, name, directors, actors, post){
      return new Promise((resolve, reject) => {
            
            var handler = conn.conn;
            var sql = "INSERT INTO mvlist (mvlistid, name, directors, actors, post) VALUES(?, ?, ?, ?, ?) ";
            
            var params = [parseInt(mvListId), name, directors, actors, post];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       });  
}

exports.addMovieToMovieList = addMovieToMovieList;

/**
 * list mvlist from start to start + count
 * @param {Int} start 
 * @param {Int} count 
 */
function getMovieLists(start, count){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT mvlistid, mvlist_name, mvlist_des, post FROM mvlist_info limit ? offset ? ";
            
            var params = [parseInt(count), parseInt(start)];
            
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: result
                  });
                  
            });
       });
}
exports.getMovieLists = getMovieLists;

/**
 * list all movies of mvlist
 * @param {Int} mvListId 
 */
function getMovieList(mvListId){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT name, directors, actors, post FROM mvlist WHERE mvlistid = ?";
            
            var params = [parseInt(mvListId)];
            
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

exports.getMovieList = getMovieList;


/***
 *  KuaKua quan operation
 * 
 * 
 */
/** Database structrue **/
// kua_info
// +---------------+-----------+---------+---------+---------+
// |  kua_id(int)  |  head_pic | context | b_color | pu_time | 
// +---------------+-----------+---------+---------+---------+
// kua_like_info
// +-------------+-----------+
// | kua_id(int) |  nick_id  |
// +-------------+-----------+
// kua_comment_info
// +--------------+------------------+--------------+
// |  kua_id(int) |  comment_message | comment_time |
// +--------------+------------------+--------------+
  

/**
  * Get list of kuakuaquan
  * @param {Int} start 
  * @param {Int} count 
  */
 function getKuakuaList(start, count){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT * FROM kua_info LIMIT ? OFFSET ?";
            
            var params = [parseInt(count), parseInt(start)];
            
            var data = {
                  kua_id: 0,
                  head_pic: "",
                  context: "",
                  b_color: "",
                  pu_time: 0,
                  comment_message_count: 0,
                  comment_messages:[],
                  like_count: 0,
                  like_nicks:[]
            };
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  //console.log(result);
                  var datas = [];
                  result.forEach(el => {
                        datas.push({
                              kua_id: el.kua_id,
                              head_pic: el.head_pic,
                              context: el.context,
                              b_color: el.b_color,
                              pu_time: el.pu_time,
                              comment_messages:[],
                              like_nicks:[]
                        });
                  });
                  resolve({
                        state: "Ok",
                        op : "Select",
                        info: datas
                  });
                  
            });
       });
}

exports.getKuakuaList = getKuakuaList;

function getKuaLike(preData){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var data = preData || {};
            const preDataLen = preData.info.length;
            
            let conditions = "IN ("
            for(var i = 0; i < preDataLen - 1; i++)
                  conditions += "?, ";
            conditions += "?)";
            var sql = "SELECT * FROM kua_like_info WHERE kua_id ";
            sql += conditions;
            
            
            var params = [];
            data.info.forEach((el)=>{
                  params.push(el.kua_id);
            });
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  //console.log(result);
                  for(let i = 0; i < data.info.length; i++){
                        for(let j = 0; j < result.length; j++){ 
                              if (result[j].kua_id == data.info[i].kua_id){
                                    data.info[i].like_nicks.push(result[j].nick_id);
                              }
                        }
                  }
                  resolve(data);
                  
            });
       });
}
exports.getKuaLike = getKuaLike;

function getKuaCommentMessage(preData){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var data = preData || {};
            console.log(preData);
            const preDataLen = data.info.length;
            let conditions = "("
            for(var i = 0; i < preDataLen - 1; i++)
                  conditions += "?, ";
            conditions += "?)";
            var sql = "SELECT * FROM kua_comment_info WHERE kua_id IN ";
            sql += conditions;
            
            
            var params = [];
            data.info.forEach((el)=>{
                  params.push(el.kua_id);
            });
            
            
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  for(let i = 0; i < data.info.length; i++){
                        for(let j = 0; j < result.length; j++){
                              if(result[j].kua_id == data.info[i].kua_id){
                                    data.info[i].comment_messages.push({
                                          comment_message: result[j].comment_message,
                                          comment_time: result[j].comment_time
                                    })
                              }
                        }
                  }
                  
                  resolve(data);
                  
            });
       });
}

exports.getKuaCommentMessage = getKuaCommentMessage;


/**
 * add a new kuakua
 * @param {String} context 
 * @param {String} bColor 
 * @param {String} picId 
 */
function addNewKua(context, bColor, picId){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO kua_info (head_pic, context, b_color, pu_time) VALUES (?, ?, ?, ?)";
            
            // the head pictures links
            const picArr = [
                  "http://static.xumengli.cn/xinyou-static/head_pic1.png",
                  "http://static.xumengli.cn/xinyou-static/head_pic2.png",
                  "http://static.xumengli.cn/xinyou-static/head_pic3.png",
                  "http://static.xumengli.cn/xinyou-static/head_pic4.png",
                  "http://static.xumengli.cn/xinyou-static/head_pic5.png",
                  "http://static.xumengli.cn/xinyou-static/head_pic6.png"
            ];

            const puTime = parseInt(new Date().valueOf() / 1000);
            const picLink = picArr[parseInt(picId)];

            var params = [picLink, context, bColor, parseInt(puTime)];
            
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: []
                  });
                  
            });
       });
}

exports.addNewKua = addNewKua;

/**
 * check the kua if is exsit.
 * @param {Int} kuaId 
 */
function kuaIsExsit(kuaId){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "SELECT * FROM kua_info WHERE kua_id = ?";
            
            var params = [parseInt(kuaId)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       }); 
}

exports.kuaIsExsit = kuaIsExsit;
/**
 * Add like to the kua
 * @param {Int} kuaId 
 * @param {Int} nickId 
 */
function likeKua(kuaId, nickId){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO kua_like_info (kua_id, nick_id) SELECT ?, ? WHERE NOT EXISTS (SELECT id FROM kua_like_info WHERE kua_id = ? AND nick_id = ?)";
           
            var params = [parseInt(kuaId), parseInt(nickId), parseInt(kuaId), parseInt(nickId)];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  console.log(result);
                  
                  if(result.insertId != 0)
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: []
                  });
                  else if (result.insertId == 0)
                        resolve({
                              state: "Is exsited",
                              op: "Insert",
                              info: []
                        });
                  else resolve({
                        state: "Failed",
                        op: "Insert",
                        info: []
                  });
            });
       });
}

exports.likeKua = likeKua;


/**
 * Add comment
 * @param {Int} kuaId 
 * @param {String} commentMessage 
 */
function addCommentToKua(kuaId, commentMessage){
      return new Promise((resolve, reject) => {
            var handler = conn.conn;
            var sql = "INSERT INTO kua_comment_info (kua_id, comment_message, comment_time) VALUES(?, ?, ?)";
           
            const time = parseInt(new Date().valueOf() / 1000);
            var params = [parseInt(kuaId), commentMessage, time];
            
            handler.query(sql, params, function(err, result, fields){
                  if(err) reject(err);
                  resolve({
                        state: "Ok",
                        op : "Insert",
                        info: result
                  });
                  
            });
       });
}


exports.addCommentToKua = addCommentToKua;