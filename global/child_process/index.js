const { exec, execSync, spawn, spawnSync, execFile, execFileSync, fork } = require('child_process')
// exec字节上限200kb  超出200kb报错
// 1.exec 异步方法 回调函数 返回数据类型为buffer 可执行shell命令或同软件进行交互
exec('node -v', (err, stdout, stderr) => {
  if (err) {
    return err
  }
  console.log(stdout.toString())
})

// 2.execSync 同步方法 执行较小的shell命令（或想立刻拿到结果
// execSync('mkdir, test') // 在当前目录下创建名为test的文件夹
const nodeVersion = execSync('node -v')
console.log(nodeVersion.toString())

// 执行软件交互
// 检测当前处于什么操作系统
const os = require('os')
console.log(os.platform())
// 若当前为windows系统
if (os.platform() === 'win32') {
  execSync("start chrome http://www.baidu.com", (err, stdout) => {
    if (err) {
      console.log('***', err)
    }
  })
} else {
  execSync("open -a 'Google Chrome' http://www.baidu.com", (err, stdout) => {
    if (err) {
      console.log('***', err)
    }
  })
}

// 3. spawn 没有字节上限 返回数据是个流 实时返回
// spawn包含3个参数，第一个为执行shell命令；第二个数组为传递参数；options配置项
// spawnSync使用较少
const a = execSync('netstat') //获取整个系统的所有网络状况 等所有数据都接收完成后才返回
console.log(a)
const { stdout } = spawn('netstat', ['-a'], {
  // options配置项
})
stdout.on('data', msg => {
  console.log(msg.toString())
})
stdout.on('close', msg => {
  console.log('当前命令结束')
})

// 4.execFile 执行可执行文件
const path = require('node:path')
const os = require('os')
const filePath = path.resolve(__dirname, os.platform() === 'win32' ? './bat.cmd': './index.sh') 
execFile(filePath, null, (err, stdout, stderr) => {
  if (err) {
    console.log('执行脚本出错：', err)
    return err
  }
  console.log('00000,', stdout)
})



// 5.fork 只能接收js模块  nodejs 不适应于cpu密集型应用，将耗时的应用代码放到子进程
const testProcess = fork('./global/child_process/test.js')
// 父子进程基于IPC可以通讯  IPC基于libel (Windows => named pipe;)  posix => (unix domain socket)
testProcess.send('这里是主进程')
testProcess.on('message', res => {
  console.log('主进程收到的消息：', res)
})
