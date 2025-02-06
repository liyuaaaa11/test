# 单个数据表查询内容
# 查询单列
SELECT id FROM `user`;
# 查询多列
SELECT id, name FROM `user`;
# 查询所有列
SELECT * FROM `user`;
# 查询列并修改查询结果后的列名
SELECT id as user_id FROM `user`;
SELECT id as user_id, name as user_name FROM `user`;
# 对查询结果排序 依据id降序排列
SELECT * FROM `user` ORDER BY id DESC;
# 限制查询结果 第一个参数开始行，第二个参数数量
SELECT * FROM `user` LIMIT 0, 3;
# 条件查询  SELECT * FROM `user` WHERE [列名] = [值]
SELECT * FROM `user` WHERE name = 'xsanjin'
# 多个条件查询 AND(并且)  OR(或者)
SELECT * FROM `user` WHERE name = 'xsanjin' AND age <= 18;
# 模糊查询 即数据表只要含有某部分就全部列出
# LIKE '%值'(模糊匹配)  指以某个值结尾返回
SELECT * FROM `user` WHERE name LIKE '%sanjin';
# LIKE '%值%'(模糊匹配) 只要携带某个值就全部返回
SELECT * FROM `user` WHERE name LIKE '%sanjin%';
# _固定字符查询的数量(1个或多个字符)
SELECT * FROM `user` WHERE name LIKE '_sanjin%';

####### 子查询+连表
# 子查询必须要用小括号包裹起来
SELECT * FROM `project` WHERE user_id = (SELECT id FROM `user` WHERE name = 'test');
# 连表查询 把user表和project表内容组合成一个表
# 内连接
SELECT * FROM `user`, `project` WHERE `user`.id = `project`.user_id;
# 外连接 左连接 右连接
# 左连接 LEFT JOIN(表名) ON (连接的条件)
# 左连接以驱动表(user)为主，如果没有关联数据则全部填充null
SELECT * FROM `user` LEFT JOIN `project` ON  `user`.id = `project`.user_id;