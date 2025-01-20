#!/usr/bin/env node
// 告诉系统用node来执行这个文件
import { program } from 'commander';
// 命令行交互工具
import inquirer from 'inquirer'
import { checkPath, downloadTemp } from './util.js'
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// 获取当前目录下的package.json文件
let json = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8');
json = JSON.parse(json)
console.log('Hello, world!');
// 定义命令行操作
// 1.设置版本号
program.version(json.version);
// 2. 基于已有git模版创建项目
program.command('create <projectName>'). // 创建模版命令 传入projectName参数
  alias('project') // 命令别名
  .description('创建项目') // 描述命令作用
  .action((projectName) => {
    // 命令行交互 支持数组  里面可存放多个对象
    inquirer.prompt([
      {
        type: 'input', // 表示用户输入类型 confirm(确认框) list(选择框) checkout(多选框)
        name: 'projectName', // 返回值的key
        message: '请输入项目名称', // 命令描述，类似于placeholder
        default: projectName // 默认值
      },
      {
        type: 'confirm',
        name: 'isVue',
        message: '请确认是否选用Vue模版'
      }
    ]).then(res => {
      // 获取命令行交互的参数
      console.log(res)
      // 校验是否存在同名项目
      if (checkPath(res.projectName)) {
        console.log(res.projectName, '文件夹已存在')
        return
      }
      if (res.isVue) {
        downloadTemp('vue', projectName)
      }
    })

    console.log(projectName)
  }) // 获取参数 

// 接收命令行参数并解析
program.parse(process.argv);