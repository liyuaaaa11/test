#!/user/bin/env node
// 告诉系统用node来执行这个文件
import { program } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
// 获取当前目录下的package.json文件
let json = fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf-8');
json.version = '0.0.1';
console.log('Hello, world!');
// 定义命令行操作
// 设置版本号
program.version(json.version);
// 接收命令行参数并解析
program.parse(process.argv);