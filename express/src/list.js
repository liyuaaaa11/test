// 学校信息模块
import db from '../middleware/knex.js'
import express from 'express'
const schoolRouter = express.Router()
schoolRouter.get('/list', async (req, res) => {
  const data = await db('school_list').select()
  const count = await db('school_list').count('* as total')
  // // 支持sql语句编写
  // db.raw('select * from school_list').then(data => {
  //   console.log('sql语句编写L:', data)
  // })
  console.log('school_list', data)
  res.json({
    code: 200,
    msg: '获取成功！',
    data,
    count: count[0].total,
    sql: db('school_list').select().toSQL().sql // 调试knex
  })
})
schoolRouter.get('/info', async (req, res) => {
  console.log('query', req.query)
  const data = await db('school_list').select().where({ id: req.query.id })
  console.log('school_info', data)
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