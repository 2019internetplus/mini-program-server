# mini-program-server
## Introduction|简介

## Deploy|部署
### Linux (Redhat or Debian and other linux or unix(unix like) os)
* Get the whole project resources.
```bash
  git clone https://github.com/2019internetplus/mini-program-server.git
```
* Install the nodejs deployment tools [pm2](http://pm2.keymetrics.io/).
```bash
 npm install -g pm2
```
* Start the project with pm2.
```bash
  pm2 start index.js
```

## Open API
### 确认码
| code | message|
|------|--------|
| 100|   success|
| 101| is exsited|
| 400|   index out of range|
| 401| arguments error|
| 404| source not found|

* API 列表
  * [v0.1](api_v0.1.md) Beta.

