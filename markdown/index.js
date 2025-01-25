
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ejs from 'ejs'
import { marked } from 'marked'
// 支持多设备浏览页面 页面位置同时更新
import browserSync from 'browser-sync'
// e模版无法直接使用__dirname,利用nodejs的pat、urlh模块返回文件的完全解析路径
const __filename = fileURLToPath(import.meta.url) // 获取文件的解析路径
const __dirname = path.dirname(__filename) //获取目录名称

let browser;
const server = () => {
  // 创建服务
  browser = browserSync.create()
  browser.init({
    baseDir: path.resolve(__dirname), // 配置根目录
    index: path.resolve(__dirname, 'index.html')
  })
}

const init = (callback) => {
  // 读取md内容
  console.log(path.resolve(__dirname, './README.md'))
  const content = fs.readFileSync(path.resolve(__dirname, './README.md'), 'utf-8')
  console.log('markdown内容；', content)
  // 将markdown内容转为html代码
  const mdToHTML = marked.parse(content)
  console.log('转为html后的markdown内容：', mdToHTML)
  // ejs.renderFile 读取.ejs文件并将内容插入模版文件
  // 第一个参数：renderFile读取.ejs文件
  // 第二个参数：options配置项，即要填充的内容
  ejs.renderFile(path.resolve(__dirname, './template.ejs'), {
    content: mdToHTML,
    title: 'markdown to html'
  }, (err, data) => {
    if (err) throw err
    // fs.writeFileSync 将插入markdown内容的模版写入html文件中
    // 此时html无任何样式
    fs.writeFileSync(path.resolve(__dirname, 'index.html'), data)
    callback && callback()
  }) 

}
// 监听md文件变化并实时更新html
fs.watchFile(path.resolve(__dirname, './README.md'), (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件更新！') 
    // 直接调用init()方法会开启多个服务
    // 后续文件更新使用reload() 浏览器刷新
    init(() => {
      browser.reload()
    })
    
  }
})
init(() => {
  // 初始化打开浏览器
  server()
})