### fs
* 前置准备 引入node内置的fs、path模块
> const fs = require('node:fs')
> const path = require('node:path')

1. 读取文件，分为异步、同步及promise三种方式；
* 异步读取fs.readFile(filePath， options参数)
> options参数
```
fs.readFile(`${filePath}`, {
  encoding: 'utf-8',
  flag: 'r'
}, (err, data) => {
  if (err) return err
  console.log(data)
})
```
* 同步读取 fs.readFileSync(filePath, options参数)
``` 
// 该操作返回类型为buffer 二进制流
// toString('utf-8')对数据进行转化
const result = fs.readFileSync(filePath, options)
console.log(result.toString('utf-8'))
```
* promise 方式
> const fsPromise = require('node:fs/promise')
```
fsPromise.readFile(filePath).then(res => {
  // 返回数据同样为buffer类型
  console.log(res.toString('utf-8'))
}).catch(err => {
  return err
})
```
2. readStream读取大文件
```
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
```