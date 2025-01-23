
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ejs from 'ejs'
import {marked} from 'marked'
import { title } from 'node:process';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const init = () => {
  // 读取md内容
  console.log(path.resolve(__dirname, './README.md'))
  const content = fs.readFileSync(path.resolve(__dirname, './README.md'), 'utf-8')
  console.log('markdown内容；', content)
  // 将markdown内容转为html代码
  const mdToHTML = marked.parse(content)
  console.log('转为html后的markdown内容：', mdToHTML)
  // 读取.ejs文件并将内容插入模版文件
  // 第一个参数：renderFile读取.ejs文件
  // 第二个参数：options配置项，即要填充的内容
  ejs.renderFile(path.resolve(__dirname, './template.ejs'), {
    content: mdToHTML,
    title: 'markdown to html'
  }, (err, data) => {
    if (err) throw err
    fs.writeFileSync(path.resolve(__dirname, 'index.html'), data)
  }) 

}
init()