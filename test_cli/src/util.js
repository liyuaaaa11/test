import fs from 'node:fs'
import download from 'download-git-repo'
import ora from 'ora'
// 设置命令行加载状态
const spinner = ora('下载中')
// 检查是否存在同名文件
export const checkPath = (path) => {
  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
}

export const downloadTemp = (branch, name) => {
  return new Promise((resolve, reject) => {
    // 执行加载动画
    spinner.start()
    // 第一个参数：下载载模版git地址(前缀➕direct:, #拼接分支branch-name) 
    download(`direct:https://github.com/liyuaaaa11/swift.git/#${branch}`, name, {clone: true}, function (err) {
      if (err) return reject
      spinner.succeed('下载完成')
      return resolve
    })
  })
}
