// 获取操作系统cpu架构
const arch = process.arch
console.log(arch)
// 1.获取操作系统的名称
console.log(process.platform)
// 2.获取进程后面的参数（数组形式）
// const argv = process.argv
// const result = argv.includes('--version') ? '1.0.0' : '无'
// console.log(argv, result)
/*
[
  '/usr/local/bin/node', // 运行当前脚本的使用工具
  '/Users/liyu/Desktop/project/nodejs/global/process/index.js', // 当前运行文件
  '--version' // 传入的参数
]
*/

// 3.cwd() 获取工作目录（绝对路径）  类似于__diename
// 注意：在esm模式下__dirname无法使用，可以使用cwd代替
console.log(process.cwd())

// 4.内存信息，查看性能，检查有没有存在内存泄露
console.log(process.memoryUsage())
/*
{
  rss: 31346688, // 常驻集大小，物理内存的存量
  heapTotal: 4415488, // v8分配的堆内存的总大小，包括未使用的内存
  heapUsed: 3704472, // 已经使用的内存
  external: 1389971, // 外部使用的内存， c\c++使用的
  arrayBuffers: 10515 // 二进制的总量
}
*/

// 5.exit 退出当前进程
setTimeout(() => {
  console.log('&&&&&')
}, 1000)

// 监听进程退出事件
process.on('exit', () => {
  console.log('当前进程退出')
})

// setTimeout(() => {
//   process.exit()
// }, 500)

// 6. kill 杀死当前进程，需要参数pid（即当前进程的id）
// setTimeout(() => {
//   process.kill(process.pid)
// }, 2000) 

// 7.获取操作系统的所有环境变量,修改的环境变量只在当前进程生效，不会影响系统内的环境变量
// 可以来用来区分开发环境 借助cross-env
console.log(process.env.NODE_ENV =='dev' ? '开发环境':'生产环境')