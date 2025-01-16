const fs = require('node:fs');
const path = require('node:path');
const filePath = path.resolve(__dirname, './index.js');
// 1.读取文件
// 异步
fs.readFile(filePath, {
  encoding: 'utf-8', // 编码格式
  flag: 'r' // 读取方式
}, (err, data) => {
  if (err) {
    return err
  }
  console.log(data)
})
// 同步 会阻塞后续代码执行
// 返回二进制流
const result = fs.readFileSync(filePath, (err, data) => {
  if (err) {
    return err
  }
  console.log(data)
})
console.log(result.toString('utf-8'))

// promise
const fsPromise = require('node:fs/promises');
fsPromise.readFile(filePath, {
  encoding: 'utf-8', // 编码格式
  flag: 'r' // 读取方式
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})

// 2. readStream 读取大文件
const readStream = fs.createReadStream(filePath)
// 读取文件流
readStream.on('data', (chunk) => {
  // 主要应用于大文件读取数据，内容一段一段返回
  console.log(chunk.toString())
})
// 读取文件结束
readStream.on('end', () => {
  console.log('end')
})

// 3. mkdirSync/rmSync 创建/删除文件夹
// 类似linux命令
const mkdir = path.resolve(__dirname, './test/test1')
const rm = path.resolve(__dirname, './test')
console.log(mkdir)
fs.mkdirSync(mkdir, {
  recursive: true // 是否递归创建文件夹
})
// fs.rmSync(rm, {
//   recursive: true // 是否递归删除文件夹
// })

// 4. 修改文件名称
const rename = path.resolve(__dirname, './test/test2')
fs.renameSync(mkdir, rename)

// 5. 监听文件变化
fs.watch(filePath, (event, filename) => {
  console.log('**event**', event, '**filename**',filename)
})
