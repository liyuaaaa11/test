import http from 'node:http'
import url from 'node:url' // 借助url处理地址栏上的参数

// 编写小型服务器
// req 接收前端信息  res 给前端返回信息
const methodObject = {
  POST: 'POST',
  GET: 'GET'
}
http.createServer((req, res) => {
  // 🧪url解析请求地址，根据不同的路径返回不同结果
  const { pathName } = url.parse(req.url)
  if (pathName === '/login') {
    res.statusCode = 200
    res.end(methodObject[req.method])
  } else {
    res.statusCode = 404
    res.end('404')
  }
}).listen(98, () => {
  console.log('98端口启动成功')
})
// 基于REST Client插件 新建一个.http类型的文件