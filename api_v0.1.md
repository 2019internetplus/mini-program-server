# API参考 V0.1(Beta)
## APIs
 * [歌单列表获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#1-歌单列表获取)
 * [歌单推荐列表获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#2-歌单推荐列表获取)
 * [影单列表获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#3-影单列表获取)
 * [影单推荐列表获取 ](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#4-影单推荐列表获取)
 * [歌单内容获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#5-歌单内容获取)
 * [影单内容获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#6-影单内容获取)
 * [夸夸圈列表获取](https://github.com/2019internetplus/mini-program-server/blob/master/api_v0.1.md#7-夸夸圈列表获取)

## API详细 
## 1. 歌单列表获取 
  ### 1.1 请求地址
  
  > GET https://api.xumengli.cn/musiclists/v0.1/list?start=START&count=COUNT
  ### 1.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | start | int | 否 | 偏移量，默认为0|
  | count | int | 是 | 返回资源个数 |
  
  ### 1.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |mlistid| int | 歌单id|
  | post | string | 歌单封面图片地址|
  | mlist_name | string | 歌单标题|
  | mlist_des | string |歌单描述|
  ### 1.4 请求样例
  ```http
  https://api.xumengli.cn/musiclists/v0.1/list?start=0&count=1
  
  ```
  ### 1.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": [
        {
            "mlistid": 1557302268,
            "mlist_name": "我们",
            "mlist_des": "",
            "post": ""
        }
    ]
}
  ```
## 2. 歌单推荐列表获取 
  ### 2.1 请求地址
  
  > GET https://api.xumengli.cn/musiclists/v0.1/recommand?token=TOKEN
  ### 2.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | token | string | 是 | token值 |
  
  ### 2.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |mlistid| int | 歌单id|
  | src | string | 歌单封面图片地址|
  | title | string | 歌单标题|
  ### 2.4 请求样例
  ```http
  https://api.xumengli.cn/musiclists/v0.1/recommand?token=334hhjks34s4v
  
  ```
  ### 2.5 响应样例 
  
  ```json
  {
     "code": 100,
     "message": "success",
     "data": [
        {
            "mlistid": 1000,
            "src": "https://xxx.jpg",
            "title": "test"
        }
    ]
  }
  ```  
  
## 3. 影单列表获取 
  ### 3.1 请求地址
  
  > GET https://api.xumengli.cn/movielists/v0.1/list?start=START&count=COUNT
  ### 3.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | start | int | 否 | 偏移量，默认为0|
  | count | int | 是 | 返回资源个数 |
  
  ### 3.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |mvlistid| int | 影单id|
  | src | string | 影单封面图片地址|
  | title | string | 影单标题|
  ### 3.4 请求样例
  ```http
  https://api.xumengli.cn/movielists/v0.1/list?start=0&count=1
  
  ```
  ### 3.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": [
        {
            "mvlistid": 1000,
            "src": "https://xxx.jpg",
            "title": "test"
        }
    ]
  }
  ```
  
## 4. 影单推荐列表获取 
  ### 4.1 请求地址
  
  > GET https://api.xumengli.cn/movielists/v0.1/recommand?token=TOKEN
  ### 4.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | token | string | 是 | token值 |
  
  ### 4.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |mvlistid| int | 影单id|
  | src | string | 影单封面图片地址|
  | title | string | 影单标题|
  ### 4.4 请求样例
  ```http
  https://api.xumengli.cn/movielists/v0.1/recommand?token=334hhjks34s4v
  
  ```
  ### 4.5 响应样例 
  
  ```json
  {
     "code": 100,
     "message": "success",
     "data": [
        {
            "mvlistid": 1000,
            "src": "https://xxx.jpg",
            "title": "test"
        }
    ]
  }
  ```  
  
## 5. 歌单内容获取 
  ### 5.1 请求地址
  
  > GET https://api.xumengli.cn/musiclist/v0.1/details?mlistid=ID
  ### 5.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | mlistid | int | 是 | 歌单id |
  
  ### 5.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |songid| int | 歌曲id|
  | src | string | 歌曲封面图片地址|
  | songname | string | 歌曲名称|
  | singer | string | 歌手|
  ### 5.4 请求样例
  ```http
  https://api.xumengli.cn/musiclist/v0.1/details?mlistid=123
  
  ```
  ### 5.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": [
        {
            "songid": 1000,
            "src": "https://xxx.jpg",
            "songname": "test",
            "singer": "test"
        }
    ]
  }
  ```  
## 6. 影单内容获取 
  ### 6.1 请求地址
  
  > GET https://api.xumengli.cn/moivelist/v0.1/details?mvlistid=ID
  ### 6.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | mvlistid | int | 是 | 影单id |
  
  ### 6.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |movieid| int | 电影ID值|
  | src | string | 电影封面图片地址|
  | moviename | string | 电影名称|
  | actor | string | 演员|
  | director | string | 导演|
  ### 6.4 请求样例
  ```http
  https://api.xumengli.cn/movielist/v0.1/details?mvlistid=123
  
  ```
  ### 6.5 响应样例 
  
  ```json
  {
    "code": 100,
    "message": "success",
    "data": [
        {
            "movieid": 1000,
            "src": "https://xxx.jpg",
            "moviename": "test",
            "actor": "test",
            "director": "test"
        }
    ]
  }
  ```  
## 7. 夸夸圈列表获取 
  ### 1.1 请求地址
  
  > GET https://api.xumengli.cn//kuakuaquan/v0.1/list?start=START&count=COUNT
  ### 1.2 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | start | int | 否 | 偏移量，默认为0|
  | count | int | 是 | 返回资源个数 |
  
  ### 1.3 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |kua_id| int | 夸夸圈id|
  | head_pic | string | 头像链接地址|
  | context | string | 夸夸圈内容|
  | b_color | string | 颜色值(#)|
  | pu_time | int | 发布时间戳|
  | comment_messages| array(object) |
  | comment_message| string| 评论内容|
  |  comment_time| int| 评论时间|
  | like_nicks| array(int)|点赞用户id数组|
  ### 1.4 请求样例
  ```http
  https://api.xumengli.cn//kuakuaquan/v0.1/list?start=0&count=1
  
  ```
  ### 1.5 响应样例 
  
  ```json
  {
    "state": 100,
    "message": "success",
    "data": [
        {
            "kua_id": 1,
            "head_pic": "http://static.xumengli.cn/minio/xinyou-static/head_pic1.png",
            "context": "富强，民主，文明，和谐，公正",
            "b_color": "#000000",
            "pu_time": 1557659814,
            "comment_messages": [
                {
                    "comment_message": "牛逼",
                    "comment_time": 1557659900
                },
                {
                    "comment_message": "牛逼",
                    "comment_time": 1557669900
                }
            ],
            "like_nicks": [
                0,
                1
            ]
        }
    ]
  }
  ```
