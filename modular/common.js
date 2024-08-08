// 模块化讲解
// commonJS的五种模式
// 1. 引入自己编写的模块
require('../prev.js')
const { fun } = require('./export.js')
console.log(fun)
// 2. 引入第三方模块
const md5 = require('md5')
console.log(md5('123456'))
// 3. nodejs内置模块  fs http  net   os  child_process
const fs = require('fs')  // 高版本nodejs 建议v16版本以上需改为 requirt('node:fs')
console.log(fs)
// 4. C++扩展  addon、napi等需要通过node-gyp进行编译生成.node文件
// 5. 引入json文件
const data = require('./mockdata.json')
console.log(data, 1)

