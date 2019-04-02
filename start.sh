#!/usr/bin/env bash
# 检查依赖
python 3.5+
node 4.2+
mysql-server
mysql-client
mssql-server # 待确认
mssql-client # 待确认
spark2.1

nb_dir="/opt/"
mysqlHost="localhost"

# 安装rpm依赖
cd $nb_dir/xinghe/app/notebook/dep/
tar -zxvf rpm_package.tar
cd rpm_package
sudo rpm -ivh *.rpm

# 安装jdk
cd ../jdk/
sudo rpm -ivh jdk-8u201-linux-x64.rpm
java
javac

# 安装mysql
cd ../mysql/
rpm -qa |grep -i mariadb
rpm -qa |grep -i mysql
if mariadb and mysql:
    rpm -e mariadb-libs-5.5.60-1.el7_5.x86_64 --nodeps
    rpm -e mariadb-libs-5.5.60-1.el7_5.x86_64 --nodeps
rpm -ivh --force --nodeps mysql-community-server-5.7.25-1.el7.x86_64.rpm
rpm -ivh --force --nodeps mysql-community-client-5.7.25-1.el7.x86_64.rpm
mysqld --initialize --user=mysql
grep 'temporary password' /var/log/mysqld.log
systemctl start mysqld.service

# 新建用户
"""
SET PASSWORD=PASSWORD('Fenxi@123');
insert into mysql.user(Host,User,Password) values("localhost","Fenxi",password("Fenxi@123"));
grant all privileges on guns.* to test@localhost identified by 'Fenxi@123';
grant all privileges on cubo.* to test@localhost identified by 'Fenxi@123';
flush privileges;
"""

# 安装python3和pip
cd ..
tar -zxvf rpm_package_python.tar
ln -s /bin/python3.6 /bin/python3
ln -s /bin/pip3.6 /bin/pip3

# 安装python虚拟环境
cd $nb_dir/xinghe/app/dep/virtualenv-16.4.3
python setup.py install
cd ../..
virtualenv -p python3 venv
. venv/bin/activate
cd dep/pip_package/
pip install --no-index --find-links="./" -r requirements.txt

# 安装nodejs
cd $nb_dir
mv node-v4.2.6-linux-x64.tar /opt/
cd /opt/
tar -zxvf node-v4.2.6-linux-x64.tar
sudo ln -s /opt/node-v4.2.6-linux-x64/bin/node /usr/local/bin/node
sudo ln -s /opt/node-v4.2.6-linux-x64/bin/npm /usr/local/bin/npm

# 初始化数据库
echo ">>>>> 初始化数据库 <<<<<"
mysql -ufenxi -h ${mysqlHost} -pFenxi@123 /opt/xinghe/app/guns/guns.sql
echo ">>>>> installing cubo <<<<<"
mysql -ufenxi -h ${mysqlHost} -pFenxi@123 /opt/xinghe/app/cubo/cubo.sql

# 安装notebook
cd notebook_package/notebook_dataset
pip install .
npm run build
mkdir -p ~/.ipython/profile_default/startup/
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/;
mkdir -p ~/.jupyter/
cp ipynb_demo/jupyter_notebook_config.py ~/.jupyter/;
export cubo_host="http://localhost:8092"
export cubo_hdfs_client_host="http://localhost:50070"


# 启动notebook
jupyter notebook
jupyter notebook --allow-root
nohup jupyter notebook > out.log 2>&1 &
or
nohup jupyter notebook --allow-root > out.log 2>&1 &
killall -9 jupyter-notebook

# set oracle jdk environment JAVA环境变量
"""
export JAVA_HOME=/usr/lib/jvm/java-8-oracle  # 这里目录要换成自己的jvm里面java的目录
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
"""