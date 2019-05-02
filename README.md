# mini-program-server
## Introduction|简介

* The whole project structure.
```        
                                                                                         +-----------------+
					                                                 |   fucking words |
					                   +---------------------------->|      filter     | 
					                   |                             +-----------------+
                                                           |                                   +------------------+
+--------------+             request               +---------------+                           |    mental test   |
| mini-program | --------------------------------->| mini-program  |-------------------------->|      and         | 
|    client    | <---------------------------------|    server     |---------------+           |  analysis system |	
+--------------+             response              +---------------+               |           +------------------+
										   |           +---------------+
										   |           |      the      |
										   +---------->|    recommand  | 
										   	       |     system    |
											       +---------------+
                                                                     		
                                                                                            

````
* Components
	* ```the fucking words filter``` filters the dirty words. Using tree maps to match the words is faster and accurater. The language is not only Chinese but also English. It helps us to create an active atmosphere amog people.
	* ```mental test and anaysis system``` offers various simple mental tests, which can analyse your mental states in detail. We distinguish the classes into four parts, each of the these has corresponding recommended resources.
	* ```the recommand system``` recommands users resources by mental test and user visited. The recommand database includes musics, movies and fictions.
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
### 错误码
| code | message|
|------|--------|
| 100|   success|
| 400|   index out of range|
| 401| arguments error|
| 404| source not found|

* API 列表
  * [v0.1](api_v0.1.md) Beta.

