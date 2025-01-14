### pngquant
* 使用修改过的median cut量化算法及其他技术实现png图像压缩
  > brew install pngquant // 安装 pngquant；只能处理png图片
  > pngquant --version
1. 压缩图片
exec(pngquant 压缩图片的路径 --output 输出图片路径)
```
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
