const os = require('node:os')
// 1.platform 获取操作系统平台  win32 => windows  darwin => mac  linux
console.log('获取当前操作平台', os.platform())
// 2.release获取当前操作系统版本
console.log('获取当前操作系统版本', os.release())
console.log(os.type())
console.log(os.version())

// webpack vite rollup open:true 打开浏览器并跳转到百度网址
// 1.判断当前操作系统的类型，对应执行不同的shell命令
const platform = os.platform()
// 获取子进程中exec用来执行shell命令
const { exec } = require('child_process')

// 定义open方法
const open = (url) => {
  console.log(platform, url)
  // 若当前处于mac系统
  if (platform === 'darwin') {
    exec(`open ${url}`)
    console.log('&&&&')
  } else if (url === 'win32') {
    exec(`start ${url}`)
  } else if (platform === 'linux') {
    exec(`xdg-open ${url}`)
  }
}

// open('http://www.baidu.com')
  
// 获取当前用户的目录 底层原理通过环境变量获取  windows => %userprofile%   mac => $HOME
console.log(os.homedir())
// 获取cpu架构 常用于安卓
console.log(os.arch())
// 获取操作系统线程cpu的信息
console.log(os.cpus().length)
/** { // cpu利用率计算
  model: 'Apple M2 Pro', //cpu型号
  speed: 2400, // cpu运行速度
  times: { 单位：毫秒
    user: 144900, // 用户所使用时间
    nice: 0, // 用户优先级比较低用户的程序的使用时间
    sys: 45240, // 系统内核所使用时间
    idle: 62312340, // 空闲的时间
    irq: 0 // 硬件被中断的使用时间
  }
} **/
// 获取网络信息
console.log(os.networkInterfaces())
/**{
  address: '192.168.4.580', // ip地址
  netmask: '255.255.255.0', // 子网掩码
  family: 'IPv4', // ip版本
  mac: '5c:e9:1e:bd:90:55', // 网卡的mac地址
  internal: false, true // 表示内网ip
 cidr: '192.168.1.214/10' // ip地址段
 } **/
