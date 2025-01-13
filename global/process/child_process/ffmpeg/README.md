## ffmpeg 跨平台多媒体处理工具
<p> 作用：用于处理音频、视频和多媒体流；对视频转码和剪辑、音频提取和合并、流媒体传输等操作。</p>

1. 安装ffmpeg
  安装brew  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  安装时报错：unable to access 'https://github.com/Homebrew/brew/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 
Failed during: /usr/bin/git remote set-head origin --auto
原因：macos系统安全升级后禁止直接执行远程脚本，添加git全局配置
```
git config --global http.sslBackend "openssl"
git config --global http.proxy "socksS://127.0.0.1:6666"
// 撤销gitconfig配置：
git config --global --unset http.sslBackend
git config --global --unset http.proxy
```
* brew基本使用
  > 安装 brew install ffmpeg
  > 卸载 brew uninstall ffmpeg
  > 更新 brew upgrade ffmpeg
  > 查看安装软件 brew list
  > 查看软件信息 brew info ffmpeg
  > 自检 brew doctor
  > 搜索软件 brew search ffmpeg
  
**抽空研究大文件上传** <br/>
2. 转换视频格式
```
// 1.不同视频格式转换
// ffmpeg -i '指定输入文件' -y(输出文件重名时直接覆盖)  '指定输出文件的格式'
const { execSync } = require('child_process')
const path = require('node:path')
const videoPath = path.resolve(__dirname, './video.mp4')
const outVideoPath1 = path.resolve(__dirname, './out_video1.gif')
execSync(`ffmpeg -i ${videoPath} ${outVideoPath1}`, {
  stdio: 'inherit' // 保持输入输出流一致,可以在控制台看到执行过程
})

// 2.提取视频中的音频文件
// ffmpeg -i '指定输入文件'  '输出文件指定.mp3'
const audioPath = path.resolve(__dirname, './out_audio.mp3')
execSync(`ffmpeg -i ${videoPath} ${audioPath}`, {
  stdio: 'inherit'
})

```

3. -t 裁剪视频
```
// 1. -ss:指定视频开始时间 -to:指定视频结束时间
// ffmpeg -i '指定输入文件' -ss 视频开始时间 -to 视频结束时间 '指定输出文件'
const outVideoPath2 = path.resolve(__dirname, './out_video2.mp4')
execSync(`ffmpeg -i ${videoPath} -ss 0 -to 1 -t 1 ${outVideoPath2}`, {
  stdio: 'inherit'
})
// 2. -t:视频时长；当-t出现时-to无效
// ffmpeg -i '指定输入文件' -ss 视频开始时间 -to 视频结束时间 -t 视频时长 '指定输出文件'
execSync(`ffmpeg -i ${videoPath} -ss 0 -to 1 -t 2 ${outVideoPath2}`, {
  stdio: 'inherit'
}) // 这里会截取0-2s的视频
```
4. -vf 添加/删除水印
<br/>
ffmpeg -filters // 查询更多API
```
// 添加文本类型水印
// ffmpeg -i '指定输入文件' -vf drawText=text=水印文本:x=10:y=10fontsize=30fontcolor=black '指定输出文件'
const waterMarText = 'xsanjin'
const outVideoPath3 = path.resolve(__dirname, './out_video3.mp4')
execSync(`ffmpeg -i ${videoPath} -vf drawtext=text=${waterMarText}:x=10:y=10:fontsize=24:fontcolor=black ${outVideoPath3}`, {
  stdio: 'inherit'
})

// 删除文本类型水印
// x：文字x轴位置 y：文字y轴位置 w(宽)：文字字数*字体大小 h(高)：字体大小
// ffmpeg -i '指定输入文件' -vf delogo:x=10:y=10:w=168:h=24 '指定输出文件'
const outVideoPath4 = path.resolve(__dirname, './out_video4.mp4')
execSync(`ffmpeg -i ${videoPath} -vf delogo=x=10:y=10:w=168:h=24 ${outVideoPath4}`, {
  stdio: 'inherit'
})
```

