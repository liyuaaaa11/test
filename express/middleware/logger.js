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
    default: {
      appenders: ['out', 'file'],
      level: 'debug'
    }
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

export default loggerMiddleware