import data, { name as xsanjin } from './export.js'
console.log(xsanjin, data)

import * as all from './export.js'
console.log(all)

// 引入json文件会报错，ESM模块不支持json文件引入
// import json from './mockdata.json'
// console.log(json)

// nodejs v16～18版本以上 高版本支持强引入json文件
import json from './mockdata.json' assert { type: 'json' }
console.log(json)

// 函数模式可以动态引入import
if(true) {
    import ('./export.js').then(res => {
        console.log(res)
    })
}