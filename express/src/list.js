// 学校信息模块
import express from 'express'
const schoolRouter = express.Router()
schoolRouter.get('/list', (req, res) => {
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
schoolRouter.get('/info', (req, res) => {
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