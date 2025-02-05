// sse单工通讯模块
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