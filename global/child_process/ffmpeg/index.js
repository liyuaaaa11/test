// 没有安装brew的话，先安装brew 具体内容在README.md 有说明
// 在终端安装brew install ffmpeg(ffmpeg -version 查看是否安装成功)
// 基于ffmpeg的音频处理实现video转音频
const { execSync } = require('child_process')
const path = require('node:path')
const videoPath = path.resolve(__dirname, './video.mp4')
const audioPath = path.resolve(__dirname, './audio.gif')
// 1.视频格式转换 mp4=>gif
execSync(`ffmpeg -i ${videoPath} ${audioPath}`, {
  stdio: 'inherit' // 保持输入输出流一致,可以在控制台看到执行过程
})
// 2.提取视频中的音频
// 3.裁剪视频
// 4.给视频添加水印
// 5.删除视频水印 
