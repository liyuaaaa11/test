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
import fs from 'fs'
import marked from 'marked' // 获取编译后的html代码
```

1. 读取文件内容
```js
const init = () => {
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
  })
}
// 一定要结尾处调用！！！！
init()

```

