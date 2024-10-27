# Path模块
    path模块在window和posix系统间存在差异。
posix（portable operating system interface of unix）表示可移植操作系统接口（操作系统标准），如：unix、like unix、linux、macos、windows wsl等；该标准主要解决代码在windows系统（进程启动调用creatprocess函数）和其他系统（linux进程启动调用fork函数）间函数不统一等问题。

    windows系统因早期操作系统设计不同，并未完全遵循posix标准，路径使用反斜杠（\）作为路径分隔符，而posix系统使用整斜杠（/）。

## path模块常用的API：
    1. path.basename 返回给定路径的最后一部分
    2. path.dirname 返回路径的目录名
    3. path.extname 返回路径的扩展名 主要用于判断文件类型
    4. path.join() 拼接路径
    5. path.resolve() 解析路径 返回绝对路径；如果都是绝对路径返回最后一个；如果只有一个相对路径，则返回当前工作目录的绝对路径；绝对路径拼接相对路径返回当前工作目录的绝对路径 __dirname指当前工作目录
    6. path.parse() 解析路径，返回一个对象{root dir base ext name};
    7. path.format() 将对象解析为路径
    8. path.sep 根据不同操作系统返回 /或\