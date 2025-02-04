import express from 'express'
import user from './src/user'
import school from './src/list'
import loggerMiddleware from './middleware/logger'
// express是个函数
const app = express()
app.use(express.json()) // 支持post解析json数据
// 请求拦截
app.use(loggerMiddleware)
// 模块化引入对应路由  然后通过中间件use()注册使用
// 第一个参数是接口前缀 防止重名
app.use('/user', user)
app.use('/school', school)

 
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
