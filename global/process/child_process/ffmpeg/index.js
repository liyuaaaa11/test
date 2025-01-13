// 没有安装brew的话，先安装brew 具体内容在README.md 有说明
// 在终端安装brew install ffmpeg(ffmpeg -version 查看是否安装成功)
// 基于ffmpeg的音频处理实现video转音频
const { execSync } = require('child_process')
const path = require('node:path')
const videoPath = path.resolve(__dirname, './video.mp4')
const outVideoPath1 = path.resolve(__dirname, './out_video1.gif')
// 1.视频格式转换 mp4=>gif  - i 指定输入文件 -y 覆盖输出文件 -f 输出格式 
execSync(`ffmpeg -i ${videoPath} -y ${outVideoPath1}`, {
  stdio: 'inherit' // 保持输入输出流一致,可以在控制台看到执行过程
})

// 2.提取视频中的音频
const audioPath = path.resolve(__dirname, './out_audio.mp3')
execSync(`ffmpeg -i ${videoPath} -y ${audioPath}`, {
  stdio: 'inherit'
})
// 3.裁剪视频  -ss 开始时间 -to 结束时间 -t 时长
const outVideoPath2 = path.resolve(__dirname, './out_video2.mp4')
execSync(`ffmpeg -i ${videoPath} -ss 1 -to 2 -t 1 -y ${outVideoPath2}`, {
  stdio: 'inherit'
})
// 当-t存在时，-to会失效
// execSync(`ffmpeg -i ${videoPath} -ss 0 -to 1 -t 2 ${outVideoPath2}`, {
//   stdio: 'inherit'
// }) // 这里会截取0-2s的视频

// 4.给视频添加水印 使用video filter  -vf 指定滤镜
const waterMarText = 'xsanjin'
const outVideoPath3 = path.resolve(__dirname, './out_video3.mp4')
execSync(`ffmpeg -i ${videoPath} -vf drawtext=text=${waterMarText}:x=10:y=10:fontsize=24:fontcolor=black -y ${outVideoPath3}`, {
  stdio: 'inherit'
})

// 5.删除视频水印  delogo 删除滤镜 w(宽) h(高) 指定删除区域 
const outVideoPath4 = path.resolve(__dirname, './out_video4.mp4')
execSync(`ffmpeg -i ${videoPath} -vf delogo=x=10:y=10:w=168:h=24 -y ${outVideoPath4}`, {
  stdio: 'inherit'
})
