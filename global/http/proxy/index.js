import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import http from 'node:http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as config  from './xsanjin.config.cjs'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
const html = fs.readFileSync(path.resolve(__dirname, './../index.html'))

// 检测代理端口是否存在
function proxyCheck(pathname) {
  // const config = fs.readFileSync(path.resolve(__dirname, './../xsanjin.config.js'))
  console.log(config.default.serve)
  const proxyList = Object.keys(config.default.serve.proxy)
  console.log(config,proxyList)
  console.log('当前端口是否存在', proxyList.includes(pathname))
  return proxyList.includes(pathname)
}

// 检测是否存在该用户
function userCheck(data) {
  const { userlist } = path.resolve(__dirname, './user.json')
  console.log(data, userlist)
  if (userlist.length === 0) return false
  const user = userlist.find(item => {
    return data.name === item.name && item.password == data.password
  })
  return user
}

http.createServer((req, res) => {
  res.writeHead('200', {
    "content-type": 'text/html'
  })
  const { pathname, query } = url.parse(req.url, true)
  if (!proxyCheck(pathname)) return res.end(html)
  const proxy = createProxyMiddleware(config.default.serve.proxy[pathname])
  proxy(req, res)
  if (req.method === 'POST' && pathname === '/api') {
    let data = ''
    req.on('data', chunk => {
      data +=chunk
    })
    if (userCheck(data)) {
      req.on('end', () => {
        res.end(data)
      })
    } else {
      res.statusCode = 200
      res.end('不存在该用户')
    }
  } else {
    res.statusCode = 404
    res.end('404～ 当前暂无此功能，待后续研发！')
  }
}).listen(80, () => {
  console.log('80端口启动成功')
})
