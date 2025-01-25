### zlib模块
* 支持数据压缩和解压缩，支持多种压缩算法，包括Deflate、Gzip和Raw Deflate。
1. 前期准备
```
improt zlib from 'node:zlib'
improt fs from 'node:fs'
improt path from 'node:path'
improt {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(improt.mate.url)
const __dirname = path.dirname(__filename)
```
2. gzip压缩/解压
* 适用于文件压缩
> 使用LZ77(数据的重复字符串的替换和引用)和哈夫曼编码(进一步压缩数据)，压缩速度慢于deflate压缩
**createGzip 压缩文件**
```
const readStream = fs.createReadStream(path.resolve(__dirname, 'index.txt'))
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'index.txt.gz'))
readStream.pipe(zlib.createGzip()).pipe(writeStream)
```
**createGunzip 解压文件**
```
const readGunStream = fs.createReadStream(path.resolve(__dirname, 'index.txt'))
const writeGunStream = fs.createWriteStream(path.resolve(__dirname, 'index.txt.gz'))
readGunStream.pipe(zlib.createGzip()).pipe(writeGunStream)
```
* 遗留问题
> 思考压缩和解压同时调用createReadStream()会报错
3. deflate压缩/解压
* 适用于网络传输和http响应的内容编码
>压缩速度更快，文件体积比gzip压缩要小
**createDeflate 压缩文件**
```
const readStream = fs.createReadStream(path.resolve(__dirname, 'index.txt'))
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'index.txt.deflate'))
readStream.pipe(zlib.createDeflate()).pipe(writeStream)
```
**createInflate 解压文件**
```
const readInflateStream = fs.createReadStream(path.resolve(__dirname, 'index.txt.deflate'))
const writeInflateStream = fs.createWriteStream(path.resolve(__dirname, 'index3.txt'))
readInflateStream.pipe(zlib.createInflate()).pipe(writeInflateStream)
```