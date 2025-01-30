import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import http from 'node:http'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
// const html = fs.readFileSync(path.resolve(__dirname, './index.html'))

function proxyCheck(pathname) {
  const config = require(path.resolve(__dirname, './xsanjin.config.js'))
  const proxyList = Object.keys(config.serve.proxy)
  return proxyList.includes(pathname)
}

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
  const { pathname, query } = url.parse(req.url, true)
  if (!proxyCheck(pathname)) return
  const proxy = createProxyMiddleware(config.serve.proxy[pathname])
  proxy(req, res, (err) => {
    return err
  })
  if (req.method === 'POST' && pathname === '/api') {
    let data = ''
    req.on('data', chunk => {
      data +=chunk
    })
    if (userCheck(data)) {
      req.on('end', () => {
        res.end(data)
      })
    }
  // res.end(html)
  } else {
    res.statusCode = 404
    res.end('404～ 当前暂无此功能，待后续研发！')
  }
}).listen(80, () => {
  console.log('80端口启动成功')
})
