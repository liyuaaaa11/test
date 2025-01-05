// 实现顺序  exec =>  execFile => spawn
### 1.exec 异步方法 回调函数 返回buffer 
执行shell命令或同软件交互
### 2.execSync 同步方法
问题：
1.在使用execSync启动系统时，因为linux系统中不存在start命令，故启动Chrome软件时会报错
  a.安装start命令，借助xdg-open来实现对应的操作（后续了解）
  b.windows打开软件 start; macOS --open打开文件、目录或url
  open [选项] 文件/目录
    选项可以是以下参数之一：
    -a 应用程序：指定使用哪个应用程序打开文件/目录。
    -e 编辑器：指定使用哪个编辑器打开文件。
    -F 打开Finder：如果文件是一个文件夹，则在Finder中打开该文件夹。
    -g 不激活应用程序：打开文件时不将其应用程序置于前台。
    -n 新建实例：不共享以前打开的应用程序的实例，而是打开一个新的实例。
    -p 打印：使用默认打印机打印文件。
    -w 写入模式：打开文件以便写入内容。
2.在使用execFile执行index.sh文件时，存在权限不通过的问题（待解救）