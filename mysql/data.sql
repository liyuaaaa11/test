# 数据表增删改
###### 数据表插入数据
# 若数据表支持null，可以插入null值
# 增加单个用户表数据 INSERT INTO 表名(列名, ...) VALUES (值, ...)
INSERT INTO user(`name`, `age`, `address`) VALUES ('xiaojin', 16, '湖北省随州市');
# 新增多条数据需要用逗号隔开
INSERT INTO user(`name`, `age`, `address`) VALUES ('xxjin', 16, '湖北省随州市'),('xjin', 22, '广东省深圳市');


############################
###### 数据表更新/编辑数据
# UPDATE [表名] SET (列名)key = (值)value WHERE 更新条件
UPDATE `user` SET name = 'xxxsanjin', age = 10, WHERE id = 8;
# 删除某条数据
DELETE FROM `user` WHERE id = 8;
# 删除多条数据
DELETE FROM `user` WHERE id IN(8, 9, 7);


########################
####### 表达式+函数
# 给每条数据name拼接字符串
SELECT CONCAT(`name`, 'test') as name FROM `user`;
# 每条数据截取neme前5个字符(left)  截取后面字符(right) 
SELECT LEFT(`name`, 5) as name from `user`;
# 每条数据生成随机数
SELECT ROUND() as mad5 FROM `user`;
# 数据SUM(求和) MAX(最大值) MIN(最小值)
SELECT SUM(`age`) as age FROM `user`;
# 获取某一列的数据总和
SELECT COUNT(*) as 'total' FROM `user`;
# NOW()(返回当前时间)
# DATE_ADD(NOW(), INTERVAL 1 DAY)(明天的时间)
# DATE_SUB(NOW(), INTERVAL 1 DAY)(昨天的时间)
SELECT NOW() as 'current_time' FROM `user`;
# 表达式判断  根据已知数据判断并返回结果
SELECT IF (sex = 1, '男', '女') FROM `user`;
