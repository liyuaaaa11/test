### fs
**fs IO操作都是由libuv完成后才推入V8事件队列中；各种计时器(setImmediate、setTimeout等)都是由V8事件循环完成**
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

3. 创建/删除文件夹
* 同步方式 类似于Linux命令
> fs.mkdirSync('文件目录', { recursive: true // 是否递归创建文件夹 })
> fs.rmSync('文件目录', { recursive: true // 是否递归删除文件夹 })

4. 修改文件名
> fs.renameSync(初始文件名, 新文件名)

5. 监听文件变化
```
fs.watch(filePath, (event, filename) => {
  console.log('**event**', event, '**filename**',filename)
})
```

6. 写入文件
* writeFileSync(文件路径, 写入内容)
> 文件未进行配置时，写入的内容会替换文件原内容；
> 需设置options，即writeFileSync(文件路径, 写入内容, {flag: 'a'})
options的可选项encoding: 编码方式; falg: mode权限;<b/>
* appendFileSync(文件路径, 写入内容)
> 该方式不会替换原始内容

7. 处理大量数据插入
```
// 创建可写流
const writeReadStrem = fs.createWriteStrem(文件路径)
let arr = [
  '待到秋来九月八，',
  '我花开后百花杀。',
  '冲天香阵透长安，',
  '满城尽带黄金甲。',
]
arr.forEach(item => {
  writeReadStrem.write('item')
})

wirteReadStrem.end() // 结束写入

// 监听写入结束
writeReadStrem.on('finish', () => {
  console.log('写入完成')
})
```

8. 源码地址
>  http://github.com/libuv/libuv
fs通过c++层的FSReqCallback类，对libuv的uv_fs_t的封装，即将fs的参数透传 给libuv层