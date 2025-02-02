### http模块
* http模块是nodejs中用于创建和处理http服务器和客户端的核心模块，使得基于http协议构建应用程序更加简单灵活。
> 创建服务器同前端进行交互
> 构建RESTful API
> 代理服务器 proxy代理
> 文件服务器或者动静分离
1. 基础使用
前端主要使用ajax fetch axios三种方式<br>
**请求方式(研究RESTful请求风格)**
* POST GET PUT DELETE PATCH OPTIONS HEAD...<br>
**路由**
* http://loaclhost:38/login  /api/list<br>
**GET和POST传参**<br>
2.创建http服务器
```js
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
3. 代理服务器
**主要内容在同一目录层级下的proxy模块中**<br>
客户端(api) -> 代理服务器 -> 服务器<br>
服务器可以有一个或多个，可以用做负载均衡、高可用(将请求转发到多个服务器上，提供冗余和故障转移)、缓存和性能优化、安全性、域名或路径重写
* 安装http-proxy-middleware模块
> npm i http-proxy-middleware
**html页面**
```html
// index.html页面
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
    fetch('/api').then(res => {
      res.text()
    })
  </script>
</body>
</html>
```
**建立服务器**
```js
// index.js
import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import http from 'node:http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as config  from './xsanjin.config.cjs'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
const html = fs.readFileSync(path.resolve(__dirname, './../index.html'))

// 检测代理端口是否存在
function proxyCheck(pathname) {
  console.log(config.default.serve)
  const proxyList = Object.keys(config.default.serve.proxy)
  console.log(config,proxyList)
  console.log('当前端口是否存在', proxyList.includes(pathname))
  return proxyList.includes(pathname)
}

http.createServer((req, res) => {
  res.writeHead('200', {
    "content-type": 'text/html'
  })
  const { pathname, query } = url.parse(req.url, true)
  if (!proxyCheck(pathname)) return res.end(html)
  const proxy = createProxyMiddleware(config.default.serve.proxy[pathname])
  proxy(req, res)
  if (req.method === 'POST' && pathname === '/api') {
    let data = ''
    req.on('data', chunk => {
      data +=chunk
    })
    req.on('end', () => {
      res.statusCode = 200
      res.end(data)
    })
  } else {
    res.statusCode = 404
    res.end('404～ 当前暂无此功能，待后续研发！')
  }
}).listen(80, () => {
  console.log('80端口启动成功')
})
```
**建立代理服务器**
```js
// proxy.js
import url from 'node:url'
import http from 'node:http'

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  if (pathname === '/api') {
    console.log('*****')
    res.end('proxy success')
  }
}).listen(3000, () => {
  console.log('3000启动成功')
})
```
**配置代理服务器**
```cjs
module.exports = {
  serve: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/xsanjin/api': {
        target: 'http://localhost:6666',
        changeOrigin: true
      }
    }
  }
}
```
**出现问题及解决思路** <br>
* The requested module './xsanjin.config.js' does not provide an export named 'default'
**源代码**
**引入文件**
```js
improt config from './xsanjin.config.js'
```
**配置文件**
```json
module.exports = {
  serve: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/xsanjin/api': {
        target: 'http://localhost:6666',
        changeOrigin: true
      }
    }
  }
}
```
出现原因：以这种方式编写时，如果不带括号，它会导致编译器查找默认导出。无论它找到什么作为默认导出，都将成为config导出；
解决方式：
* a.当模块有命名的导出，可以使用解构赋值按需导入
* b.使用*将所有内容导入
> improt * as config from './xsanjin.config.js'
* ReferenceError: module is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '/Users/liyu/Desktop/project/nodejs/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
解决方式：
* a.修改配置文件package.json，将type: 'module'改为type: 'commonjs'
* b.在es模块中定义require，并使用它导入commonjs库
```js
import {createReqire} from 'module'
const require = createRequire(import.meta.url)
```
* c.将配置文件更改为.cjs文件，使用解构赋值导入

4. 实现动静分离
* 将动态生成的内容(动态网页、api请求)和静态资源(html、css、js或者图像文件)分开处理和开发，提高网站的性能和可伸缩性；
> 性能优化;提高网站加载速度，static资源借助缓存机制存储在cdn(内容分发网络)或浏览器缓存中，减少网络请求和数据传输的开销
> 负载均衡;动态请求分发到不同的服务器或服务上，平衡服务器的负载，提高系统的可伸缩和容错性
> 安全性;static资源可以公开访问的，动态请求处理敏感数据或需要特定身份验证和授权，方便系统管理访问控制和安全策略
**初始化配置文件**
* npm init -y
> 生成json文件并配置相关内容 type设置为module
> 创建static文件包，将所有静态资源保存 包括html及css文件
**客户端**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="userjoin" onclick="userjoin()">login</button>
  <script>
    // 携带用户数据请求登录接口
    function userjoin() {
      fetch('api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: 'xsanjin',
          passward: '123456'
        })
      }).then(res => {
        // 接口返回的json数据无法直接进行使用需要借助json()进行处理
          res.json().then(data => {
            console.log(data)
          })
      }).catch(err => {
        console.log(err)
      })
    }
  </script>
</body>
</html>
```
**服务器**
对于static、动态资源进行分开处理，引入mime第三方库配置content-type类型，实现用户登录校验并返回对应信息。
```js
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import url, { URL } from 'node:url'
import mime from 'mime'
// 以promise引入fs文件readfile
import { readFile } from 'fs/promises'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
const html = fs.readFileSync(path.resolve(__dirname, './../static/index.html'))

const serve = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url, url.startsWith('static'))
  // 检测是否请求静态资源目录
  if (url === '' || url === '/') return res.end(html)
  if (method === 'GET' && url.startsWith('/static')) return getStatic(req, res)
  console.log(url, ['POST', 'GET'].includes(method), url.startsWith('/api'))
  if (['POST', 'GET'].includes(method) && url.startsWith('/api')) {
    console.log('请求获取信息')
    switch (method) {
      case 'POST':
        console.log('post')
        getPost(req, res)
        break;
      case 'Get':
        console.log('get')
        res.statusCode = 200
        res.end(data)
    }
  } else {
    console.log('404 notfound')
    // res.writeHead(404, {
    //   'content-type': 'text/plain'
    // })
    res.statusCode = 200
    // res.end(req)
  }
  
})
// 检测是否存在该用户
async function userCheck(data) {
  console.log('url', await readFile(new URL('user.json', import.meta.url)))
  const { userList }  = JSON.parse(
    await readFile(new URL('./user.json', import.meta.url))
  )
  console.log('****', data,'%', userList)
  if (!userList || userList.length === 0) return false
  const user = userList.find(item => {
    return data.name === item.name && item.password == data.password
  })
  return user
}
// 检测到post请求执行
function getPost(req, res) {
  // console.log(req)
  let data = ''
  req.on('data', chunk => {
    console.log(chunk)
    data +=chunk
  })
  req.on('end', () => {
    data = JSON.parse(data)
  })
  console.log('********', data)
  // 检测用户是否存在用户表
  if (userCheck(data)) {
    req.on('end', () => {
      res.statusCode = 200
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const resData = Object.assign(data, {
        token: '49ba59abbe56e057'
      })
      res.end(JSON.stringify(resData))
    })
  } else {
    res.writeHead(200)
    res.end('不存在该用户')
  }
}
// 客户端请求获取静态资源
function getStatic(req, res) {
  const { method, url } = req
  const staticPath = path.join(process.cwd(), url)
  console.log('static资源路径', staticPath)
  fs.readFile(staticPath, (error, data) => {
  if (error) {
    res.writeHead(404, {
    'content-type': 'text/plain'
    })
    res.end('not found')
  } else {
      console.log('获取新资源～')
      // 获取当前获取文件的mime类型定义content-type
      const type = mime.getType(staticPath)
      res.writeHead(200, {
        'content-type': type, // mime类型，每种文件类型设置值不同
        'cache-control': 'public, max-age=3600' // 设置缓存 以秒计算3600表示一个小时
      })
      res.end(data)
    }
  })
}
serve.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```
**模拟用户库**
```json
{
  "userList": [
    {
      "name": "xsanjin",
      "username": "0706_xsanjin",
      "age": 18,
      "password": 123456
    },
    {
      "name": "qyi",
      "username": "0128_qyi",
      "age": 18,
      "password": 123456
    },
    {
      "name": "rzai",
      "username":"10_xsanjin",
      "age": 20,
      "password": 123456
    }
  ]
}
```

**出现问题**
1. Module "file:///Users/liyu/Desktop/project/nodejs/global/http/xsanjin/user.json" needs an import attribute of type "json" 不能直接读取本地json文件
解决方式：
借助ajax()、fetch()、new XMLHttpRequest()获取json内容

2. fetch()请求接口返回的json数据无法直接使用,需要将其转换
```js
fetch('api/login', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    name: 'xsanjin',
    passward: '123456'
  })
}).then(res => {
  res.json().then(data => {
    console.log(data)
    local
  })
}).catch(err => {
    console.log(err)
})
```
