'use strict';


exports.err401 = function(){
      var response = {
            "code": 401,
            "message": "argument error",
            "data": []
      };
      return JSON.stringify(response);
};

exports.err402 = function(){
      var response = {
            "code": 402,
            "message": "sql error",
            "data": []
      };
      return JSON.stringify(response);
}


exports.err404 = function(){
      var response = {
            "code": 404,
            "message": "not found",
            "data": []
      };
      return JSON.stringify(response);
}