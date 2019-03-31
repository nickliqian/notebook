#!/usr/bin/env bash
# 检查依赖
python 3.5+
node 4.2+
mysql-server
mysql-client
mssql-server # 待确认
mssql-client # 待确认


# 安装系统依赖
sudo apt-get install libsnappy-dev

# 安装虚拟环境
cd notebook_package/dep/virtualenv-16.4.3
sudo python setup.py install
cd ../..
virtualenv -p python3 venv
. venv/bin/activate
cd dep/pip_package/
pip install --no-index --find-links="./" -r requirements.txt


# 安装nodejs
nb_dir="/opt/xinghe/app"
cd $nb_dir
sudo ln -s $nb_dir/notebook_package/dep/node-v4.2.6-linux-x64/bin/node /usr/local/bin/node
sudo ln -s $nb_dir/notebook_package/dep/node-v4.2.6-linux-x64/bin/npm /usr/local/bin/npm

# 安装notebook
cd notebook_package/notebook_dataset
pip install .
npm run build
mkdir -p ~/.ipython/profile_default/startup/
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/;
mkdir -p ~/.jupyter/
cp ipynb_demo/jupyter_notebook_config.py ~/.jupyter/;






