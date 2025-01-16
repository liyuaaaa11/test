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
const writePath = path.resolve(__dirname, './test/test.txt')
fs.watch(writePath, (event, filename) => {
  console.log('**event**', event, '**filename**',filename)
})

// 6. 写入文件
fs.writeFileSync(writePath, '\nhello world', {
  encoding: 'utf-8',
  flag: 'a' // 追加写入
})
// 该方法不会替换原始内容
fs.appendFileSync(writePath, '\nunshift创始人')

// 7. 创建可写流
// 处理大量数据分批插入
let arr = [
  '待到秋来九月八，',
  '我花开后百花杀。',
  '冲天香阵透长安，',
  '满城尽带黄金甲。',
] 

const writeReadStrem = fs.createWriteStream(writePath)
arr.forEach(item => {
  writeReadStrem.write(item + '\n')
})
writeReadStrem.end() // 结束写入
writeReadStrem.on('finish', () => {
  console.log('写入完成')
})