const { exec, execSync } = require('child_process')
// 1.exec 异步方法 回调函数 返回数据类型为buffer 可执行shell命令或同软件进行交互
exec('node -v', (err, stdout, stderr) => {
  if (err) {
    return err
  }
  console.log(stdout.toString())
})

// 2.execSync 同步方法
const nodeVersion = execSync('node -v')
console.log(nodeVersion.toString())