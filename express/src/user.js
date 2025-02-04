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

export default userRouter