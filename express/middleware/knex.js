import knex from 'knex'
import fs from 'fs'
import jsyaml from 'js-yaml'
import path from 'path'
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename)
const config = jsyaml.load(fs.readFileSync(path.resolve(__dirname, './../db.config.yaml'), 'utf-8'))
const db = knex({
  client: 'mysql2',
  connection: config.db
})
// 动态创建表
db.schema.createTableIfNotExists('school_list', table => {
  table.increments('id') // id 主键自增
  table.string('name') // name 字符串
  table.integer('num')
  table.timestamps(true, true) // 创建时间 更新时间
}).then(() => {
  console.log('创建成功')
})
export default db