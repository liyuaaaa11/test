### crypto 密码学
* nodejs用c/c++实现加密和哈希算法，通过crypto模块暴露为js接口
> const cypto = require('node:crypto')
1. 对称加密
**createCipheriv 加密内容**<br/>
* 双方协商定义一个密钥以及iv
> createCipheriv() 用于创建一个cipher对象，cipher对象是用于加密数据的类
```
const key = crypto.randomBytes(32) // 生成32位密钥
const iv = Buffer.from(crypto.randomBytes(16)) // 生成16位iv
// 第一个参数 algorithm 是一个支持的加密算法，如aes-128-cbc、aes-256-cbc(常用)
// 第二个参数 key 用于加密的密钥 支持32位
// 第三个参数 iv 用于加密的初始化向量 支持16位 保证每次加密的结果不一样 密钥串补码 类型为Buffer、TypedArray或DataView
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
cipher.update('xsanjin', 'utf-8', 'hex') // 加密内容 编码格式 输出格式
const cipherResult = cipher.final('hex') // 输出加密结果
console.log('对称加密-加密内容：', cipherResult)
```
**createDecipheriv 解密内容**<br/>
* 已知密钥和iv进行后续操作
```
// 解密算法需要和加密算法一致
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
decipher.update(cipherResult, 'hex', 'utf-8') // 解密内容 编码格式 输出格式
const decipherResult = decipher.final('utf-8')
console.log('对称加密-解密内容：', decipherResult)
```
2. 非对称加密
* generateKeyPairSync()生成公钥(公开)和私钥(管理员私有)密钥对
> 公钥加密，私钥解密
**publicEncrypt加密内容**<br>
```
// 生成密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // 密钥长度
  // 设置私钥格式
  privateKeyEncoding: {},
  // 设置公钥格式
  publicKeyEncoding: {}
})
// 第一个参数 publicKey 用于加密的公钥 支持32位
// 第二个参数 data 用于加密的明文 支持32位 类型为Buffer、TypedArray或DataView
const encrypted = crypto.publicEncrypt(public, Buffer.form('xsanjin'))
const encryptedResult = encrypted.toString('hex') 
console.log('非对称加密-加密内容：', encryptedResult)
```
**privatedDecrypt解密内容**
```
// 第一个参数 privateKey 用于解密的私钥 支持32位
// 第二个参数 encrypted 用于解密的密文
const decrypted = crypto.privateDecrypt(privateKey, encrypted)
const decryptedResult = decrypted.toString()
console.log('非对称加密-解密内容：', decryptedResult)
```
3. 哈希函数
**单向加密，不可逆**<br>
**具有唯一性，不是很安全**
createHash()创建hash对象
```
const hash = crypto.createHash('md5')
hash.update('xsanjin') // 加密内容
const hashResult = hash.digest('hex') // md5加密结果
console.log('哈希加密：', hashResult)
```
* 可用于校验文件的一致性