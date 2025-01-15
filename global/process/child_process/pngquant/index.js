const { exec } = require('child_process');
const path = require('node:path');
const img = path.resolve(__dirname, './wechat.png')
const outImg = path.resolve(__dirname, './test.png')
// --output 输出文件
// speed 1-11，数字越大压缩越快，质量越差
// --quality=0-100 图片质量；数字越高质量越好，文件越大
exec(`pngquant ${img} --speed=8 --quality=80 --output ${outImg}`, (err, stdout, stderr) => {
  if (err) {
    return err
  }
  console.log(stdout)
})


