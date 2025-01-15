### pngquant
* 使用修改过的median cut量化算法及其他技术实现png图像压缩
  > brew install pngquant // 安装 pngquant；只能处理png图片
  > pngquant --version
exec(pngquant 压缩图片的路径 --speed(压缩速度) --quality(图片质量)  --output(输出文件) 输出图片路径)
```
// --output 输出文件
// speed 1-11，数字越大压缩越快，质量越差
// --quality=0-100 图片质量；数字越高质量越好，文件越大
const { exec } = require('child_process');
const path = require('node:path');
const img = path.resolve(__dirname, './wechat.png')
const outImg = path.resolve(__dirname, './test.png')
exec(`pngquant ${img} --output ${outImg}`, (err, stdout, stderr) => {
  if (err) {
    return err
  }
  console.log(stdout)
})
```
