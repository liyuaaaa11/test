# 查看当前数据库
show database; 
# 创建数据库 大小写无限制
# IF NOT EXISTS 如果数据库不存在，则创建xsanjin数据库，否则不执行
CREATE DATABASE IF NOT EXISTS `xsanjin`
# 数据库设置为字符集
DEFAULT CHARACTER SET = 'utf8'
###########
# 创建user表包含字段 id,name,age,address,create_time
# 每个字段包含: 名称,类型,属性
# NOT NULL 字段不能为空; AUTO_INCREMENT 字段自增; PRIMARY KEY当前字段设置为主键; TIMESTAMP 代表当前字段是时间戳;
CREATE TABLE `user` (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) COMMENT '名字',
  age INT COMMENT '年龄',
  address VARCHAR(200) COMMENT '地址',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
 ) COMMENT '用户表'


 ####### 创建project表 且外键user表id
CREATE TABLE `project`(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '项目id',
  name VARCHAR(100) COMMENT '项目名称',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  user_id INT NOT NULL COMMENT '用户id',
  FOREIGN KEY (user_id) REFERENCES user(id)
) COMMENT '项目表'


 # 已创建表增加字段
 ALTER TABLE `user` ADD COLUMN `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间';
 # 删除表中某个字段
 ALTER TABLE `user` DROP `update_time`;
 # 删除多个字段/执行多类型操作使用逗号分隔
 ALTER TABLE `user` DROP `update_time`, DROP `age`;

 # 编辑表中某个字段
 ALTER TABLE `user` MODIFY `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间';
