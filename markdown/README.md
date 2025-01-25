### markdown转html
* 主要第三方库
> ejs: js模块引擎，实现html动态嵌入新内容，将markdown转为美观的html页面<br/>
> marked: markdown解析器和编译器，将markdown语法转为html标记<br>
> browserSync: 实时预览和同步网友更改；当markdown文件进行编辑并将其转换html时会自动刷新浏览器
#### 前期准备
**创建.ejs模版文件**
```ejs
// 1. 纯脚本标签 可以写任意js用于流程控制，无任何输出 
<% code %> 
// 2. 输出经过html转义的内容
// 变量中包含'<'、'>'、'&'会转义成字符实体，&lt; &gt; &amp等
// 注意：使用 <%= 最好保证里面内容没有html字符
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <!-- title和content类似于占位符 -->
  <%- content %>
  <%= value> // 变量
  <%= a ? b : c %> 表达式
  <%= a + b %>
  <%- a %> 插入html代码
</body>
</html>
```
**引入第三方库**
```js
import ejs from 'ejs'
import marked from 'marked' // 获取编译后的html代码
import browserSync form 'browser-sync'

// e模版无法直接使用__dirname,利用nodejs的pat、urlh模块返回文件的完全解析路径
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url) // 获取文件的解析路径
const __dirname = path.dirname(__filename) //获取目录名称
```

1. 读取文件内容
```js
const init = (callback) => {
  // 1. 读取md内容
  console.log(path.resolve(__dirname, './README.md'))
  const content = fs.readFileSync(path.resolve(__dirname, './README.md'), 'utf-8')
  console.log('markdown内容；', content)
  // 2. 将markdown内容转为html代码
  const mdToHTML = marked.parse(content)
  console.log('转为html后的markdown内容：', mdToHTML)
  // 3.  renderFile读取.ejs文件
  // 参数1: 读取.ejs路径
  // 参数2；options配置项，即读取内容
  ejs.renderFile('./template.ejs', {
    title: 'md转义html',
    content: mdToHTML
  }, (err, data) => {
    if (err) return err
    // 将插入md内容的模版文件写入html
    // 引入gitgithub-markdown.css文件添加md样式
    fs.writeFileSync(path.resolve(__dirname, 'index.html'), data)
    callback && callback()
  })
} 
// 一定要结尾处调用！！！！
init(() => {
  server()
})
```

2. 添加浏览器热更新
```
let browser;
const server = () => {
  // 创建一个服务
  browser = browserSync.create()
  // 初始化服务
  browser.init({
    server: {
      baseDir: './', // 配置根目录
      index: 'index.html' // 指向生成的html文件
    }
  })
}
fs.watchFile(path.resolve(__dirname, 'README.md'), (curr, prve) => {
  if (curr.time !== prve.time) {
    init(() => {
      browser.reload()
    })
  }
})
```

