import url from 'node:url'
import http from 'node:http'

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  if (pathname === '/api') {
    console.log('*****')
    res.end('proxy success')
  }
}).listen(3000, () => {
  console.log('3000启动成功')
})