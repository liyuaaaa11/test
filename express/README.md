### expressweb应用框架
**前期准备**
* 安装express、log4js(日志系统)
> 提供一组灵活的路由和中间件，简单便捷构建web应用；
> 路由中间件； 可以定义路由规则，将特定的url路径映射到相应的处理函数，允许开发人员在请求到达路由处理函数之前或之后的执行逻辑(如身份验证、日志记录和错误处理)；
> 模块化路由；提高代码的组织性和维护性；
> 视图引擎支持：与各种模块引擎集成，如ejs、pug(jade)、handlebars等，方便动态生成html页面及动态渲染数据
> 中间件生态系统: 可以使用各种中间件扩展和增强应用程序的功能，如身份认证、会话管理、日志记录、静态文件服务等
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