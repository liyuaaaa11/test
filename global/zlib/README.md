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
**createGzip 压缩文件**
```
const readStream = createReadStream(path.resolve(__dirname, 'index.txt'))
const writeStream = createWriteStream(path.resolve(__diename, 'index.txt.gz'))
readStream.pipe(zlib.createGzip()).pipe(writeStream)
```
**createGunzip 解压文件**
```
const readGunStream = createReadStream(path.resolve(__dirname, 'index.txt'))
const writeGunStream = createWriteStream(path.resolve(__diename, 'index.txt.gz'))
readGunStream.pipe(zlib.createGzip()).pipe(writeGunStream)
```