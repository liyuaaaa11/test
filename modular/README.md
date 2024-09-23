## 模块化讲解 type默认指定commonJS
### commonJS的五种模式
1. 引入自己编写的模块
2. 引入第三方模块
3. nodejs内置模块  fs http  net   os  child_process
4. C++扩展  addon、napi等需要通过node-gyp进行编译生成.node文件
5. 引入json文件

### ESM模块化引入
不支持引入json文件  前端通过vite或webpack用loader进行处理引用<br/>
v16~18高版本以上 支持通过assert设置 type: json 强引入json文件

## commonJS 和 ESM 的区别
1. commonjs基于运行时的同步加载，esm基于编译时的异步加载；
2. commonjs可以修改值，esm值不可进行修改(只读)；
3. commonjs不可以tree shaking，esm支持tree shaking；
4. commonjs中顶层的this指向这个模块本身，而ESM6中顶层this指向undefined；
5. import非要掺杂在逻辑中可以使用import函数模式
...
    函数模式可以动态引入import
...

## 源码学习
fs是操作文件的系统，可以读写文件，对文件进行增删改查 <br/>
readFileSync(file_name, utf8)读取文件返回utf-8的字符串 <br/>
process.dlopen() .node文件转换 <br/>
js文件转换 <br/>
nodejs通c++操作weakmap，v8封装了safeweakmap去调用weakmap里面的信息 <br/>
1. 初始化new safeweakmap()方法；
2. js文件是否存在已解析过的js缓存文件，不存在缓存文件时直接读取js文件；
3. 判断是否是js结尾的文件，直接读取package.json文件( readPackageScope(file_name) );
4. 判断当前package.json的type是commonjs还是moudle
如果都没有问题时，则使用_compile()进行编译 <br/>
、、、
// 编译文件内容
// index.js  const xsanjin = 19; console.log(xsanjin);
let wrap = function(script) {
    return Module.wrapper[0] + script + Module.wrapper[1]
}
const weapper = [
    '(function (exports, require, module, _filename, _diename) {',
    '\n})'
]
// 最终编译内容为 (function (exports, require, module, _filename, _diename) { const xsanjin = 18; console.log(xsanjin); \n})
、、、
StringPrototypeEndsWith(str, '.js') 判断当前字符串是否以 '.js' 结尾