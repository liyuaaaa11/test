### markdown转html
* 主要第三方库
> ejs: js模块引擎，实现html动态嵌入新内容，将markdown转为美观的html页面<br/>
> marked: markdown解析器和编译器，将markdown语法转为html标记<br>
> browserSync: 实时预览和同步网友更改；当markdown文件进行编辑并将其转换html时会自动刷新浏览器
1. ejs
```
// 1. 纯脚本标签 可以写任意js用于流程控制，无任何输出 
<% code %> 
// 2. 输出经过html转义的内容
// 变量中包含'<'、'>'、'&'会转义成字符实体，&lt; &gt; &amp等
// 注意：使用 <%= 最好保证里面内容没有html字符
<%= value> // 变量
<%= a ? b : c %> 表达式
<%= a + b %>
```
