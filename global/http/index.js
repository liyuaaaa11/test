import http from 'node:http'
import url from 'node:url' // 借助url处理地址栏上的参数

// 编写小型服务器
const typearr = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']
const pathArr = ['/login', '/register', '/getUserInfo']
// 获取当前请求类型
function getMethodType(type) {
  return typearr.findIndex(item => { return type ===item })
}

// post相应
function repPost(req, res, pathname) {
  // 获取请求携带参数
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  console.log('data', data)
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(data)
  })
}

// get相应
function repGet(req, res, query) {
  console.log('query', query.id == 1)
  if (query.id != 1) {
    console.log('该用户不存在')
    res.statusCode = 404
    res.end('该用户不存在')
    return 
  }
  const user = {
    id: 1,
    name: '三金',
    username: 'xsanjin',
    age: 18
  }
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(user))
}

// req 接收前端信息  res 给前端返回信息
http.createServer((req, res) => {
  // 🧪url解析请求地址，根据不同的路径返回不同结果
  // 设置为true表示将query内容序列化为对象
  // query获取get请求携带参数
  const { pathname, query } = url.parse(req.url, true)
  console.log(pathname)
  // 检测请求地址是否存在 否则返回404
  if (!pathArr.includes(pathname))
    return req.on('end', () => {
      res.statusCode(404)
    })
  const type = getMethodType(req.method)
  console.log(type)
  switch (type) {
    case 0:
      repPost(req, res, pathname)
      break;
    case 1:
      repGet(req, res, query)
      break;
    // case 2:
    //   repPut(req, res)
    //   break;
    // case 3:
    //   repDelete(req, res)
    //   break;
    // case 4:
    //   repPatch(req, res)
    //   break;
    // case 5:
    //   repOptions(req, res)
    //   break;
    // case 6:
    //   repHead(req, res)
    //   break;
  }
}).listen(98, () => {
  console.log('98端口启动成功')
})

// 基于REST Client插件 新建一个.http类型的文件