import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import mime from 'mime'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)

const serve = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url, url.startsWith('static'))
  // 检测是否请求静态资源目录
  if (method === 'GET' && url.startsWith('/static')) {
    const staticPath = path.join(process.cwd(), url)
    console.log('static资源路径', staticPath)
    fs.readFile(staticPath, (error, data) => {
      if (error) {
        res.writeHead(404, {
          'content-type': 'text/plain'
        })
        res.end('not found')
      } else {
        // 获取当前获取文件的mime类型定义content-type
        const type = mime.getType(staticPath)
        res.writeHead(200, {
          'content-type': type // mime类型，每种文件类型设置值不同
        })
        res.end(data)
      }
    })
  }
  
})
serve.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})