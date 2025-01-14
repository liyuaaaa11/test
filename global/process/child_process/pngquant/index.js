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

