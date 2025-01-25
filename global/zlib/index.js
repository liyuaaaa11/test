import zlib from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url) // 获取文件的解析路径
const __dirname = path.dirname(__filename) //获取目录名称

const readStream = fs.createReadStream(path.resolve(__dirname, 'index.txt'))
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'index.txt.gz'))
readStream.pipe(zlib.createGunzip()).pipe(writeStream)