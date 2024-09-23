import { JSDOM } from "jsdom";
import  fs from 'fs'

// JSDOM是构造函数～
const htmlText = `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
        <body>
            <h1>JSDOM 基本使用！</h1>
            <div class="app"></div>
        </body>
    </html>
`
const root = new JSDOM(htmlText)

// 获取bom对象
const window = root.window
const document = window.document

// 向htmlText中加入接口请求的内容
// fetch 在nodejs v18+版本存在 基本使用用法借鉴浏览器
const parentBox = document.getElementsByClassName('app')[0] || null
const url = 'https://api.thecatapi.com/v1/images/search?limit=10&page=1'
fetch(url).then(res => res.json()).then(data => {
    console.log(data)
    data.forEach(item => {
        const image = document.createElement('img')
        image.src = item.url;
        image.style.width = '150px'
        image.style.height = '200px'
        if (!parentBox) return
        parentBox.appendChild(image)
    });
    // 第一个参数指定文件路径  第二个参数写入内容(序列化后的内容)
    fs.writeFileSync('./index.html', root.serialize())
    console.log(root)
    console.log(root.serialize())
})


