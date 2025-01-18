const crypto = require('node:crypto');
// 1. 对称加密
// 双方协商定义一个密钥以及iv
// 1.1 加密
// createCipheriv() 用于创建一个cipher对象，cipher对象是用于加密数据的类
// 第一个参数 algorithm 是一个支持的加密算法，如aes-128-cbc、aes-256-cbc(常用)
// 第二个参数 key 用于加密的密钥 支持32位
// 第三个参数 iv 用于加密的初始化向量 支持16位 保证每次加密的结果不一样 密钥串补码 类型为Buffer、TypedArray或DataView
const key = crypto.randomBytes(32) // 生成32位密钥
const iv = Buffer.from(crypto.randomBytes(16)) // 生成16位iv
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
cipher.update('xsanjin', 'utf-8', 'hex') // 加密内容 编码格式 输出格式
const cipherResult = cipher.final('hex') // 输出加密结果
console.log(cipherResult)
// 1.2 解密
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
decipher.update(cipherResult, 'hex', 'utf-8') // 解密内容 编码格式 输出格式
const decipherResult = decipher.final('utf-8')
console.log(decipherResult)

// 2. 非对称加密