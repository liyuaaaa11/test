import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import url, { URL } from 'node:url'
import mime from 'mime'
// 以promise引入fs文件readfile
import { readFile } from 'fs/promises'
// 邮件服务
import yaml from 'js-yaml'
import nodemailer from 'nodemailer'
import { error } from 'node:console'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
const html = fs.readFileSync(path.resolve(__dirname, './../static/index.html'))

// 初始化邮件服务
const mailInfo = yaml.load(fs.readFileSync(path.resolve(__dirname, './../mail.yaml'), 'utf8'))
const transport = nodemailer.createTransport({
  service: 'qq', // 服务商
  host: 'smtp.qq.com', // 发送邮件服务器
  prot: 456,// 发送邮件端口465或587
  secure: true, // 是否使用https
  auth: {
    user: mailInfo.user, // 邮箱账号
    pass: mailInfo.pass // 密码或者授权码
  }
})

const serve = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url, url.startsWith('static'))
  // 检测是否请求静态资源目录
  if (url === '' || url === '/') return res.end(html)
  if (method === 'GET' && url.startsWith('/static')) return getStatic(req, res)
  console.log(url, ['POST', 'GET'].includes(method), url.startsWith('/api'))
  if (['POST', 'GET'].includes(method) && url.startsWith('/api')) {
    console.log('请求获取信息')
    switch (method) {
      case 'POST':
        console.log('post')
        getPost(req, res)
        break;
      case 'Get':
        console.log('get')
        res.statusCode = 200
        res.end(data)
    }
  } else {
    console.log('404 notfound')
    // res.writeHead(404, {
    //   'content-type': 'text/plain'
    // })
    res.statusCode = 200
    // res.end(req)
  }
})
// 检测是否存在该用户
async function userCheck(data) {
  console.log('url', await readFile(new URL('user.json', import.meta.url)))
  const { userList }  = JSON.parse(
    await readFile(new URL('./user.json', import.meta.url))
  )
  console.log('****', data,'%', userList)
  if (!userList || userList.length === 0) return false
  const user = userList.find(item => {
    return data.name === item.name && item.password == data.password
  })
  return user
}
// 检测到post请求执行
function getPost(req, res) {
  // console.log(req)
  let data = ''
  req.on('data', chunk => {
    console.log(chunk)
    data +=chunk
  })
  req.on('end', () => {
    data = JSON.parse(data)
    console.log('********', data)
    const { pathname } = url.parse(req.url)
  // 未登录用户无法请求其他数据
    if (typeof window !== 'undefined' && !localStorage.getItem('token') && pathname !== '/api/login') {
      res.writeHead(500, {
        'content-type': 'text/plain'
      })
      res.end('该用户未登录！')
      return
    }
    // 发送邮件
    console.log(pathname)
    if (pathname === '/api/send/meil') {
      console.log('send meil')
      const { to, from, subject, text } = { ...data }
      // 发送邮件
      transport.sendMail({
        to, // 收件者
        from, // 发件者
        subject, // 主题
        text // 内容
      }).catch(error =>  console.log(error) )
      res.end('ok')
      return
    }
    // 检测用户是否存在用户表
    if (userCheck(data)) {
      req.on('end', () => {
        res.statusCode = 200
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        const resData = Object.assign(data, {
          token: '49ba59abbe56e057'
        })
        res.end(JSON.stringify(resData))
      })
    } else {
      res.writeHead(200)
      res.end('不存在该用户')
    }
  })
  
}

function getStatic(req, res) {
  const { method, url } = req
  const staticPath = path.join(process.cwd(), url)
  console.log('static资源路径', staticPath)
  fs.readFile(staticPath, (error, data) => {
  if (error) {
    res.writeHead(404, {
    'content-type': 'text/plain'
    })
    res.end('not found')
  } else {
      console.log('获取新资源～')
      // 获取当前获取文件的mime类型定义content-type
      const type = mime.getType(staticPath)
      res.writeHead(200, {
        'content-type': type, // mime类型，每种文件类型设置值不同
        'cache-control': 'public, max-age=3600' // 设置缓存 以秒计算3600表示一个小时
      })
      res.end(data)
    }
  })
}
serve.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})