const path = require('node:path')

const pathMacOSStr = '/test/path/path.html'
const pathWindowsStr = '\\test\\path\\path.html'
// windows兼容正斜杠写法
// 1. basename 返回给定路径的最后一部分
console.log('处理macos路径：', path.basename(pathMacOSStr))

console.log('处理windows路径：', path.basename(pathWindowsStr))
console.log('使用macos处理windows路径：', path.win32.basename(pathWindowsStr))

// 2.dirname 返回路径的目录名
console.log('处理macos路径：', path.dirname(pathMacOSStr))

console.log('处理windows路径：', path.dirname(pathWindowsStr))
console.log('使用macos处理windows路径：', path.win32.dirname(pathWindowsStr))

// 3.extname 返回路径的扩展名 主要用于判断文件类型
console.log('处理macos路径：', path.extname('path.html'))

// 4.join() 拼接路径
console.log(path.join('/a', '/b', '../../../', '/d', '/e'))

// 5.resolve() 解析路径 返回绝对路径
// 如果都是绝对路径返回最后一个
console.log(path.resolve('/a', '/b', '/c'))
// 如果只有一个相对路径，则返回当前工作目录的绝对路径
console.log(path.resolve('./path.js'))
// 绝对路径拼接相对路径返回当前工作目录的绝对路径 __dirname指当前工作目录
console.log(path.resolve(__dirname, './export.js')) // 构建工具在输出文件时必要的绝对路径

// 6. parse() 解析路径，返回一个对象{root dir base ext name};
console.log(path.parse(pathMacOSStr))
console.log('解析windows路径：', path.parse(pathWindowsStr))
console.log('使用macos解析windows路径：', path.win32.parse(pathWindowsStr))
// 7. format() 将对象解析为路径
const obj1 = {
  root: '/', // 根目录
  dir: '/test/path', // 文件所在目录
  base: 'path.html', // 文件名+后缀名
  ext: '.html', // 文件拓展
  name: 'path' // 文件名
}
console.log(path.format(obj1))

// 8. sep 根据不同操作系统返回 /或\
console.log(path.sep)