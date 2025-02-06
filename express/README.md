### expressweb应用框架
**前期准备**
* 安装express、log4js(日志系统)
> 提供一组灵活的路由和中间件，简单便捷构建web应用；<br>
> 路由中间件； 可以定义路由规则，将特定的url路径映射到相应的处理函数，允许开发人员在请求到达路由处理函数之前或之后的执行逻辑(如身份验证、日志记录和错误处理)；<br>
> 模块化路由；提高代码的组织性和维护性；<br>
> 视图引擎支持：与各种模块引擎集成，如ejs、pug(jade)、handlebars等，方便动态生成html页面及动态渲染数据<br>
> 中间件生态系统: 可以使用各种中间件扩展和增强应用程序的功能，如身份认证、会话管理、日志记录、静态文件服务等<br>
* 安装nodemon
> sudo npm i nodemon -g
> 实时更新js文件,不用多次重启服务器
> nodemon app.js启动服务器
* 安装mysql2
> 连接mysql并编写sql语句
```js
import fs from 'fs'
import mysql2 from 'mysql2'
import jsyaml from 'js-yaml'
const config = jsyaml.load(fs.readFileSync('./db.config.yaml', 'utf-8'))
console.log(config.db)
// 创建连接池
mysql2.createConnection({
  ...config.db
})
```
* 基础应用
```js
import express from 'express'
// express是个函数
const app = express()
app.use(express.json()) // 支持post解析json数据
// get请求
// 第一个参数  api地址
// 第二个地址  回调函数 req请求(req.query接收客户端参数)  res响应(返回客户端数据)
app.get('/get', (req, res) => {
  console.log('get', req.query)
  res.send('get')
})
// 动态参数 req.params接收客户端参数
app.get('/get/:id', (req, res) => {
  console.log('get', req.params)
  res.send('动态参数')
})
// post请求 req.body接收客户端参数
app.post('/post', (req, res) => {
  console.log('get', req.body)
  res.send('post')
})
app.listen(3000, () => {
  console.log('http://localhost:3000')
})

```
1. 模块化编写
* 用户登录模块
>主要涉及登录、注册、验证码获取等请求
```js
// user.js
// 用户登录与注册模块
import express from 'express'
const userRouter = express.Router()
router.post('/login', (req, res) => {
  res.json({
    code: 200,
    msg: '登录成功！'
  })
})

router.post('/register', (req, res) => {
  res.json({
    code: 200,
    msg: '注册成功！'
  })
})
// userRouter模块导出
export default userRouter
```
* 学校模块
> 主要涉及学校列表及详情获取
```js
// list.js
// 学校信息模块
import express from 'express'
const schoolRouter = express.Router()
router.get('/list', (req, res) => {
  res.json({
    code: 200,
    msg: '获取成功！',
    data: [
      {
        id: 1,
        name: '测试学校'
      },

      {
        id: 2,
        name: '学校名称'
      }
    ]
  })
})
router.get('/info', (req, res) => {
  res.json({
    code: 200,
    msg: '获取成功！',
    data: {
      id: 1,
      name: '测试学校'
    }
  })
})
// 导出schoolRouter模块
export default schoolRouter
```
2. 引入模块化内容并注册应用
```js
// app.js
import express from 'express'
import user from './src/user'
import school from './src/list'
// express是个函数
const app = express()
app.use(express.json()) // 支持post解析json数据
// 模块化引入对应路由  然后通过中间件use()注册使用
// 第一个参数是接口前缀 防止重名
app.use('/user', user)
app.use('/school', school)
```
3. 中间件编写
```js
// middleware.js
import log4js from 'log4js'
// 配置log4js 控制台输出日志  文件输出日志
log4js.configure({
  appenders: {
    out: { // 控制台输出配置
      type: 'stdout',
      layout: {
        type: 'colored' // 控制台输出样式
      }
    },
    file: { // 作为文件输出配置
      filename: 'logs/server.log',
      type: 'file'
    }
  },
  categories: { // 存放类别
    appenders: ['out', 'file'],
    level: 'debug'
  }
})
// 初始化logger
const logger = log4js.getLogger('default')
// 请求拦截器  每一个接口请求都会经过这个中间件 
// req 接收前端传来的数据
// res 返回前端的数据
// next 执行下一步
const loggerMiddleware = (req, res, next) => {
  logger.debug(`[${req.method}] ${req.url}`)
  next()
}

export default loggerMiddleware
```
**app.js引入并应用**
```js
// app.js
import express from 'express'
import loggerMiddleware from './middleware/logger'
// express是个函数
const app = express()
// 请求拦截
app.use(loggerMiddleware)
```
4. 防盗链
防止其他用户直接通过链接访问到本网站的图片、视频或其他媒体文件显示到自己的网页。<br>
* 主要防护措施：
> http引用检查；检查请求来源(即来源网址是否与合法来源匹配), 通过服务器配置文件或特定脚本实现<br>
> referrer检查；检查http请求中的referrer字段，该字段指示了请求资源的来源页面,通过服务器配置文件或特定脚本实现<br>
> 访问控制列表(acl), 网站管理员可以配置服务器的访问控制列表，只允许特定的域名或ip地址访问资源<br>
> 使用防盗链插件或脚本；一些网站平台和内容管理系统提供专门的插件或脚本防止盗链如nginx<br>
>水印技术: 在图片或视频上添加水印可以帮助识别盗链行为并提醒用户资源的来源(ffmpeg) 在global/process/child_process/ffmpeg文件夹<br>
```js
// app.js
import express from 'express'
// 网站白名单
const whiteList = ['localhost', '127.0.0.1'] // 可以配置网址或者ip
// express是个函数
const app = express()
// 编写防盗链 放在请求注册之前
const preventHotLingKing = (req, res, next) => {
  // 获取referer值 直接打开资源无法获取到referer值，需要发起请求
  // referer值是可以被(后端)伪造的
  const referer = req.get('referer')
  console.log(referer)
  if (referer) {
    const { hostname } = new URL(referer)
    if (!whiteList.includes(hostname)) {
      console.log('当前页面不在白名单中')
      res.status(403).send('您没有访问此页面的权限！')
      return
    }
  }
  console.log('访问成功～')
  next()
}
app.use(preventHotLingKing)
```
5. 响应头与跨域之间的关系
* cors跨域资源共享
> 当协议不同、域名不同、端口不同符合任意一项，浏览器会拒绝该请求<br>
> 前后端分离时，需要后端在服务器设置响应头允许前端访问<br>

* 满足以下条件会触发预检请求，options请求由浏览器发起
> content-type设置为application/json<br>
> 自定义请求头<br>
> 非普通请求 patch put delete<br>
**设置服务器响应头**
 ```js
 // middlewar/logger.js文件 设置响应头
const loggerMiddleware = (req, res, next) => {
  logger.debug(`[${req.method}] ${req.url}`)
  // * 允许所有资源访问 获取不到session值
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // 指定ip或者网址
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
  // 默认只支持get post head三种方式
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  // 支持application/json请求头
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  // 后端自创响应头并抛出 返回给前端读取
  res.set('username', 123456)
  res.setHeader('Access-Control-Expose-Headers', 'username')
  next()
}
 ```
 **静态页面**
 ```html
 <script>
  // 同源策略 协议不同、域名不同、端口不同 任意不同浏览器会拒绝请求
  // 默认是get请求
  // content-type默认支持application/x-www-form-urlencode(name=xsanjin&name=10) | multipart/form-data(formdata) ｜text/plain(纯文本)
  fetch('http://localhost:3000/user/info', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'xsanjin',
      pass: '123456'
    })
  }).then(res =>{
    const headers = res.headers
    // 读取后端抛出自定义内容
    console.log(headers.get(username))
    res.json()
  }).then(res => {
    console.log(res)
  })
</script>
 ```
6. SSE单工通讯
```js
// src/sse.js sse单工通讯模块
import express from 'express'
const sseRouter = express.Router()
// 全双工通讯 websocket-实时通讯 前后端可以实时发送信息
//大屏项目 sse 后端需要实时返回 前端不需要传数据(即前端不能给后端实时操作)

sseRouter.get('/data', (req, res) => {
  // 设置响应头为text/event-stream 以流的形式推送
  res.setHeader('Content-Type', 'text/event-stream')
  // 计时器每隔一秒给前端发送一次数据流
  setInterval(() => {
    res.write('event: test\n') // 默认message 可以自定义监听事件名称
    res.write('data:'+DataTransfer.now()+'\n\n') // 返回数据
  }, 1000)
})
// 导出sseRouter模块
export default sseRouter
```
**静态页面**
```html
<script>
// public/index.html
// 单工通讯接收后端传过来的实时数据
const sse = new EventSource('http://localhost:3000/sse/data')
// 默认message
sse.addEventListener('message', (e) => {
  console.log(e.data)
})
// 监听自定义方法
sse.addEventListener('test', (e) => {
  console.log(e.data)
})
</script>
```
**主页面注册引用**
```js
// app.js
app.use('/sse', sseRouter)
```
