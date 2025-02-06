// 用户登录与注册模块
import db from '../middleware/knex.js'
import express from 'express'
const userRouter = express.Router()
userRouter.post('/login', async (req, res) => {
  const { name, password } = req.body
  // 查询数据库
  const user = await db('user').where({ name, password }).select()
  console.log('user', req.body, user)
  if (!user.length) {
    res.json({
      code: 400,
      msg: '用户名或密码错误！'
    })
    return
  }
  res.json({
    code: 200,
    msg: '登录成功！'
  })
})

userRouter.post('/register', async (req, res) => {
  const { name, age, address, password } = req.body
  console.log(req.body)
  await db('user').insert({name, age, address, password})
  res.json({
    code: 200,
    msg: '注册成功！'
  })
})

export default userRouter