### http模块
* http模块是nodejs中用于创建和处理http服务器和客户端的核心模块，使得基于http协议构建应用程序更加简单灵活。
> 创建服务器同前端进行交互
> 构建RESTful API
> 代理服务器 proxy代理
> 文件服务器或者动静分离
1. 基础使用
前端主要使用ajax fetch axios三种方式
**请求方式(研究RESTful请求风格)**
* POST GET PUT DELETE PATCH OPTIONS HEAD...
**路由**
* http://loaclhost:38/login  /api/list
**GET和POST传参**
2.创建http服务器
```
import http from 'node:http'
import url from 'node:url'

// 定义请求类型
const typearr = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']
// 定义路径Arr
const pathArr = ['/login', '/register', '/getUserInfo']
// 获取当前请求类型
function getMethodType(type) {
  return typearr.findIndex(item => { return type ===item })
}

// post相应
function repPost(req, res, pathname) {
  // 获取请求携带参数
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  console.log('data', data)
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(data)
  })
}

// get相应
function repGet(req, res, query) {
  console.log('query', query.id == 1)
  if (query.id != 1) {
    console.log('该用户不存在')
    res.statusCode = 404
    res.end('该用户不存在')
    return 
  }
  const user = {
    id: 1,
    name: '三金',
    username: 'xsanjin',
    age: 18
  }
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(user))
}

// req 接收前端信息  res 给前端返回信息
http.createServer((req, res) => {
  // 🧪url解析请求地址，根据不同的路径返回不同结果
  // 设置为true表示将query内容序列化为对象
  // query获取get请求携带参数
  const { pathname, query } = url.parse(req.url, true)
  console.log(pathname)
  // 检测请求地址是否存在 否则返回404
  if (!pathArr.includes(pathname))
    return req.on('end', () => {
      res.statusCode(404)
    })
  const type = getMethodType(req.method)
  console.log(type)
  // 获取请求类型执行对应操作
  switch (type) {
    case 0:
      repPost(req, res, pathname)
      break;
    case 1:
      repGet(req, res, query)
      break;
  }
}).listen(98, () => {
  console.log('98端口启动成功')
})

```
* 基于REST Client插件创建.http类型的文件模拟接口请求
> login.html 登录接口post请求  getUserInfo.html 获取用户信息get请求