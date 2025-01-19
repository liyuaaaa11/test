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
console.log('对称加密-加密内容：', cipherResult)
// 1.2 解密
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
decipher.update(cipherResult, 'hex', 'utf-8') // 解密内容 编码格式 输出格式
const decipherResult = decipher.final('utf-8') // 输出解密结果
console.log('对称加密-解密内容：', decipherResult)

// 2. 非对称加密
// 2.1 生成密钥对 生成私钥(管理员单独拥有)和公钥(分发给其他用户)
// generateKeyPairSync() 用于生成密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // 密钥长度
  // 私钥格式
  privateKeyEncoding: {
    type: 'pkcs1', // 私钥格式 spki/pkcs1
    format: 'pem' // 输出
  },
  publicKeyEncoding: {
    type: 'spki', // 公钥格式 spki/pkcs1
    format: 'pem' // 输出
  }
})
// 2.2 公钥加密
// 第一个参数 publicKey 用于加密的公钥 支持32位
// 第二个参数 data 用于加密的明文 支持32位 类型为Buffer、TypedArray或DataView
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('xsanjin')) // 加密结果为Buffer类型
const encryptedResult = encrypted.toString('hex') 
console.log('非对称加密-加密内容：', encryptedResult) // 输出加密结果

// 2.3 私钥解密
// 第一个参数 privateKey 用于解密的私钥 支持32位
// 第二个参数 encrypted 用于解密的密文
const decrypted = crypto.privateDecrypt(privateKey, encrypted) // 解密结果为Buffer类型
console.log('非对称加密-解密内容：', decrypted.toString()) // xsanjin

// 3. 哈希函数
// 单向加密，不可逆
// createHash() 用于创建一个hash对象，hash对象是用于生成hash摘要的类
// 第一个参数 algorithm 是一个支持的hash算法，如md5、sha1、sha256、sha512(常用)
const hash = crypto.createHash('md5')
hash.update('xsanjin') // 加密内容
const hashResult = hash.digest('hex') // 输出md5加密结果
console.log('哈希加密：', hashResult)