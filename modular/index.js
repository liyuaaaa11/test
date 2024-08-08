 // 源码学习
 // index.js  const xsanjin = 19; console.log(xsanjin);
let wrap = function(script) {
    return Module.wrapper[0] + script + Module.wrapper[1]
}
const weapper = [
    '(function (exports, require, module, _filename, _diename) {',
    '\n})'
]
// 最终编译内容为 (function (exports, require, module, _filename, _diename) { const xsanjin = 18; console.log(xsanjin); \n})

// 编译组装成为一个字符串 调用node虚拟机(vm)中script方法
// 通过importModuleDynamically判断当前有没有import函数模式动态加载模块
// 存在loader.import()处理模块 script.runInThisContext()返回执行结果
 
