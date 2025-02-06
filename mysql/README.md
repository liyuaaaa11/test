### mac系统安装mysql安装
网址：https://dev.mysql.com/downloads/mysql/
![alt text](mysql-install.png)
**配置mysql命令**
1. 编辑.zshrc文件
sudo vim ~/.zshrc<br>
i键进入编辑模式，输入export PATH=$PATH:/usr/local/mysql/bin<br>
esc键退出编辑模式，输入:wq保存退出
![alt text](mysql-setting.png)
2. source ~/.zshrc执行配置文件
输入mysql -version 查看当前mysql版本
