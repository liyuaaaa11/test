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