// 定义全局变量
// require('./child.js')
global.name = 'xsanjin'
console.log(globalThis.name)
// import child from './child.js'
// child()

// nodejs环境内置API
// 1. __dirname 当前文件所在目录；file文件名， extname文件名后缀；
// 2. __filename  当前文件的绝对路径
// 3. Buffer处理二进制、媒体数据
// 4. process
console.log(__dirname) // 获取当前执行脚本的目录 
console.log(process.argv) // 读取当前执行进程后面传入的参数