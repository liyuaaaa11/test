import zlib from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url) // 获取文件的解析路径
const __dirname = path.dirname(__filename) //获取目录名称

// 1. gzip压缩/解压
// 压缩文件
const readGzipStream = fs.createReadStream(path.resolve(__dirname, 'index.txt'))
const writeGzipStream = fs.createWriteStream(path.resolve(__dirname, 'index.txt.gz'))
readGzipStream.pipe(zlib.createGzip()).pipe(writeGzipStream)

// 解压文件
const readGunStream = fs.createReadStream(path.resolve(__dirname, 'index.txt.gz'))
const writeGunStream = fs.createWriteStream(path.resolve(__dirname, 'index2.txt'))
readGunStream.pipe(zlib.createGunzip()).pipe(writeGunStream)

// 2. deflate压缩/解压
// 压缩文件
const readStream = fs.createReadStream(path.resolve(__dirname, 'index.txt'))
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'index.txt.deflate'))
readStream.pipe(zlib.createDeflate()).pipe(writeStream)

// 解压文件
const readInflateStream = fs.createReadStream(path.resolve(__dirname, 'index.txt.deflate'))
const writeInflateStream = fs.createWriteStream(path.resolve(__dirname, 'index3.txt'))
readInflateStream.pipe(zlib.createInflate()).pipe(writeInflateStream)

// 3. 网络传输(http请求)压缩 
import http from 'node:http'
const serve = http.createServer((req, res) => {
  const name = 'xsanjin'.repeat(1000)
  // 当成一个文本让浏览器解析
  // 3.1 gzip格式 239b
  res.setHeader('Content-Encoding', 'gzip')
  res.setHeader('Content-type', 'text/plan;charset=utf-8')
  // 将返回文本内容压缩 注意每次服务器更改时都需要重启
  let resultGzip = zlib.gzipSync(name)
  res.end(resultGzip)

  // 3.2 deflate格式 230b
  res.setHeader('Content-Encoding', 'deflate')
  res.setHeader('Content-type', 'text/plan;charset=utf-8')
  // 将返回文本内容压缩 注意每次服务器更改时都需要重启
  let resultDeflate = zlib.deflateSync(name)
  res.end(resultDeflate)
})
// 端口号小于65535
serve.listen(4060, () => {
  console.log('服务器启动成功！')
})