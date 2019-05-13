"use strict";

/**
 * The mysql connection handler. 
 * @port 3306
 * @host api.xumengli.cn 
 * @user root
 * @database xinyou
 */

var mysql = require('mysql');

var connection = mysql.createPool({
      connectionLimit: 100,
      host: 'api.xumengli.cn',
      user: 'root',
      password: '#####',
      port: '3306',
      database: 'xinyou'
});

exports.conn = connection;