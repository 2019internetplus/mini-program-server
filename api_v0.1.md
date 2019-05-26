# API参考 V0.1(Beta)
## APIs
 * [情绪测试获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#1-情绪测试获取)

 * [心灵鸡汤获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#2-心灵鸡汤获取)
 
 * [手动添加心情值](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#3-手动添加心情值)
## API详细 
## 1. 情绪测试获取
  ### 1.1 请求地址
  
  > GET https://api.xumengli.cn/test/v0.1/get
  ### 1.2 请求参数
  
  无
  
  ### 1.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  | problem_id | int | 测试id|
  | title| string | 测试标题|
  | s_1 | string | 选项1|
  | s_2 | string | 选项2|
  | s_3 | string | 选项3|
  | s_4 | string |选项4 |
  |type | string | 题目类型|


  ### 1.4 请求样例
  ```http
  https://api.xumengli.cn/test/v0.1/get
  
  ```
  ### 1.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": [
        {
            "problem_id": 1,
            "title": "今天的感觉像不像被推上了战场",
            "s_1": "已无力招架(瑟瑟发抖)",
            "s_2": "嗯，有点累了",
            "s_3": "还好吧?有事正常处理就好",
            "s_4": "完全不觉得啊",
            "type": "0"
        },
        {
            "problem_id": 2,
            "title": "会整天觉得紧张、心神不安吗",
            "s_1": "完全没有",
            "s_2": "有时会紧张",
            "s_3": "经常紧张",
            "s_4": "对对对对",
            "type": "1"
        },
        {
            "problem_id": 3,
            "title": "大致来说，今天样样事情都挺开心",
            "s_1": "完全不开心\t",
            "s_2": "有开心的，不多吧",
            "s_3": "基本都不错\t",
            "s_4": "开心啊，很开心了~",
            "type": "0"
        },
        {
            "problem_id": 4,
            "title": "今天的日常事务，感觉自己做的够好吗",
            "s_1": "很糟糕",
            "s_2": "勉强可以",
            "s_3": "没啥问题",
            "s_4": "相当棒哦",
            "type": "0"
        }
    ]
  }
  ```

## 2. 心灵鸡汤获取
  ### 2.1 请求地址
  
  > GET https://api.xumengli.cn/soulsoup/v0.1/get
  ### 2.2 请求参数
  
  无
  
  ### 2.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  | imag_src| string | 图片地址|


  ### 2.4 请求样例
  ```http
  https://api.xumengli.cn/soulsoup/v0.1/get
  
  ```
  ### 2.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": [
        {
            "image_src": "http://static.xumengli.cn/xinyou-static/525609E96E5BE4B2C879DB93AD9D481F.jpg"
        },
        {
            "image_src": "http://static.xumengli.cn/xinyou-static/5263FAAE6DA386CF36AAC8486B5F2209.jpg"
        },
        {
            "image_src": "http://static.xumengli.cn/xinyou-static/A8DDA4A74B65B685097E12C3E9605684.jpg"
        },
        {
            "image_src": "http://static.xumengli.cn/xinyou-static/BACD44C6B81D6324D1F4432B735ECFF7.jpg"
        },
        {
            "image_src": "http://static.xumengli.cn/xinyou-static/CCFAB9AB0626E0DE265615437A03D9DC.jpg"
        }
    ]
}
  ```
  
  ## 3. 手动添加心情值 
  ### 3.1 请求地址
  
  > PUT https://api.xumengli.cn/em/v0.1/addInputValue?token=TOKEN&commit=COMMIT&openid=OPENID&input_value=INPUT_VALUE&message=MESSAGE
  ### 3.2 请求参数
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  | token | string | token值|
  | commit| int | 提交(0，首次， 1，非首次)|
  | openid | int | openid值|
  | input_value | int | 心情值|
  | message | string | 消息 |
  
  
  ### 3.3 返回值 data[] JSON
  
  无


  ### 3.4 请求样例
  ```http
  https://api.xumengli.cn/addInputValue?token=1558858993&commit=1&openid=o7K0Z48OkwZi0LxTInXWGwdWlizM&input_value=91&message=helloworld
  
  ```
  ### 3.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": []
 }
  ```
