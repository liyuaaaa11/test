import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import mime from 'mime'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
const html = fs.readFileSync(path.resolve(__dirname, './../static/index.html'))

const serve = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url, url.startsWith('static'))
  // 检测是否请求静态资源目录
  if (url === '' || url === '/') {
    
    res.end(html)
  }
  if (method === 'GET' && url.startsWith('/static')) {
    getStatic(req, res)
    return
  }
  if (['POST, GET'].includes(method) && url.startsWith('/api')) {
    switch (method) {
      case 'POST':
        console.log('post')
        getPost()
        break;
      case 'Get':
        console.log('get')
        res.statusCode = 200
        res.end(data)
    }
  } else {
    res.writeHead(404, {
      'content-type': 'text/plain'
    })
    res.end('404 notfund')
  }
  
})
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
// 检测到post请求执行
function getPost() {
  let data = ''
  req.on('data', chunk => {
    data +=chunk
  })
  // 检测用户是否存在用户表
  if (userCheck(data)) {
    req.on('end', () => {
      res.statusCode = 200
      res.end(data)
    })
  } else {
    res.writeHead(200, {
      'content-type': 'text/plain'
    })
    res.end('不存在该用户')
  }
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