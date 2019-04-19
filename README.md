# mini-program-server
## Open API
### 错误码
| code | message|
|------|--------|
| 100|   success|
| 400|   index out of range|
| 401| arguments error|
| 404| source not found|

### API参考

返回值

| 属性 | 类型 | 说明|
|------|----|-------|
|  code | int| 状态码|
| message| string | 提示信息|
| data| list | 数据列表|

#### v0.1(Beta)

* 歌单列表获取 
  * 请求地址
  
  > GET https://api.sherlocklee.top/musiclists/v0.1/list?start=START&count=COUNT
  * 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | start | int | 否 | 偏移量，默认为0|
  | count | int | 是 | 返回资源个数 |
  
  * 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |mlistid| int | 歌单ID值|
  | src | string | 歌单封面图片地址|
  | title | string | 歌单标题|
  * 请求样例
  ```http
  https://api.sherlocklee.top/musiclists/v0.1/list?start=0&count=1
  
  ```
  * 响应样例 
  
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
* 歌单推荐列表获取 
  * 请求地址
  
  > GET https://api.sherlocklee.top/musiclists/v0.1/recommand?token=TOKEN
  * 请求参数
  
  | 属性 | 类型 |必填|说明|
  |-------|-----|----|---|
  | token | string | 是 | token值 |
  
  * 返回值 data[] JSON
  
  | 属性 | 类型 |  说明|
  |------|-----|------|
  |mlistid| int | 歌单ID值|
  | src | string | 歌单封面图片地址|
  | title | string | 歌单标题|
  * 请求样例
  ```http
  https://api.sherlocklee.top/musiclists/v0.1/recommand?token=334hhjks34s4v
  
  ```
  * 响应样例 
  
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
