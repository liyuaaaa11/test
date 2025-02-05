import express from 'express'
import user from './src/user.js'
import school from './src/list.js'
import loggerMiddleware from './middleware/logger.js'
// 网站白名单
const whiteList = ['localhost', '127.0.0.1'] // 可以配置网址或者ip
// express是个函数
const app = express()
app.use(express.json()) // 支持post解析json数据
// 请求拦截
app.use('*', loggerMiddleware)
// 编写防盗链
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
// 满足以下条件会触发预检请求，options请求由浏览器发起
// 1. content-type设置为application/json
// 2. 自定义请求头
// 3. 非普通请求 patch put delete

// 模块化引入对应路由  然后通过中间件use()注册使用
// 第一个参数是接口前缀 防止重名
app.use('/user', user)
app.use('/school', school)
// 初始化静态资源 自定义虚拟路由
app.use('/assets', express.static('public'))
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
 
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 以下是express的基础使用
 * 
 * 
 */
// // get请求
// // 第一个参数  api地址
// // 第二个地址  回调函数 req请求(req.query接收客户端参数)  res响应(返回客户端数据)
// app.get('/get', (req, res) => {
//   console.log('get', req.query)
//   res.send('get')
// })
// // 动态参数 req.params接收客户端参数
// app.get('/get/:id', (req, res) => {
//   console.log('get', req.params)
//   res.send('动态参数')
// })
// // post请求 req.body接收客户端参数
// app.post('/post', (req, res) => {
//   console.log('get', req.body)
//   res.send('post')
// })
// app.listen(3000, () => {
//   console.log('http://localhost:3000')
// })
