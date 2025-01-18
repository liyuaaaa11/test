### crypto 密码学
* nodejs用c/c++实现加密和哈希算法，通过crypto模块暴露为js接口
> const cypto = require('node:crypto')
1. 对称加密
**createCipheriv 加密内容**
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
console.log(cipherResult)
```
**createDecipheriv 解密内容**
* 已知密钥和iv进行后续操作
```
// 解密算法需要和加密算法一致
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
decipher.update(cipherResult, 'hex', 'utf-8') // 解密内容 编码格式 输出格式
const decipherResult = decipher.final('utf-8')
```