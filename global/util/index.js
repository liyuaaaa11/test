import util from 'node:util';
import { exec } from 'node:child_process';

// 1. util.promisify
//
// 原始调用方式
exec('node -v', (err, stdout, stderr) => {
  // 接受回调函数，参数分别是错误信息，标准输出和标准错误输出
  if (err) {
    console.error(err)
    return err
  }
  console.log('原始调用：', stdout)
})
// 使用util.promisify
const execAsync = util.promisify(exec) // 将exec函数转换为promise函数
// 使用promise方式调用 kCustomPromisifiedSymbol没有对外提供，只是一个内部属性，读取不到key
//  如果返回多个参数，返回resolve的参数是一个对象，包含多个属性;如果返回一个参数，直接返回resolve的参数;
execAsync('node -v').then(res => {
  console.log('util调用', res)
}).catch(err => {
  console.error(err)
})

// 自定义实现promisify
const promisify = (fn) => {
  return (...args) => {
    const promise = new Promise((resolve, reject) => {
      fn(...args, (err, ...values) => {
        if (err) {
          reject(err)
        } else {
          resolve(values.length > 1 ? values : values[0])
        }
      })
    })
    return promise
  }
}
const execPromise = promisify(exec)
execPromise('node -v').then(res => {
  console.log('自定义promisify', res)
}).catch(err => {
  console.error(err)
})

// 2. util.callbackify
// 将promise函数转换为回调函数
const func = (type) => {
  if (type === 'success') {
    return Promise.resolve('成功')
  } else {
    return Promise.reject('失败')
  }
}
const callbackfunc = util.callbackify(func)
callbackfunc('success', (err, res) => {
  if (err) {
    console.error('util.callbackify：', err)
  } else {
    console.log('util.callbackify：',res)
  }
})

// 自定义实现callbackify
const callbackify = (fun) => {
  return (...args) => {
    const callback = args.pop() //获取args最后一个参数(即回调函数)
    fun(...args).then(res => {
      callback(null, res)
    }).catch(err => {
      callback(err)
    })
  }
}
const callbackFunc = callbackify(func)
callbackFunc('success', (err, res) => {
  if (err) {
    console.error('自定义callbackify：', err)
  } else {
    console.log('自定义callbackify：', res)
  }
})

// 3. util.format 格式化字符串 类似于c语言的printf
// %s 字符串 %d 数字 %j json对象
console.log(util.format('%s:%s;--%s:%d', 'name', 'xsanjin', 'age', 18)) // name:xsanjin;--age:18


