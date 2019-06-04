# 安装部署开发版本的Notebook
**From SJS**
## Dev mode command
### js构建
`sudo npm run build:watch`  
### 启动调试模式
`jupyter notebook --debug --no-browser`  
### ipython预设组件
> [启动ipython或python解释器自动导入组件（例如：numpy）](https://blog.csdn.net/xlinsist/article/details/51168892)  

`.ipython\profile_default\startup` 在这个路径里面放置文件，加载内核的时候会主动执行。  
`.jupyter\jupyter_notebook_config.py` 此文件是`jupyter notebook`的配置文件
`jupyter notebook --generate-config`
```
从 jupyter notebook 5.0 版本开始，提供了一个命令来设置密码：jupyter notebook password，生成的密码存储在 jupyter_notebook_config.json。
$ jupyter notebook password
Enter password:  **** 111111
Verify password: **** 111111
[NotebookPasswordApp] Wrote hashed password to /Users/you/.jupyter/jupyter_notebook_config.json
```
```
c.NotebookApp.ip='*'#163行
c.NotebookApp.password = u'sha:ce...刚才复制的那个密文'  #217行
c.NotebookApp.open_browser = False#208
c.NotebookApp.port =8888 #可自行指定一个端口, 访问时使用该端口228行
```

## Install
### 离线安装
```
# 安装python虚拟环境
cd virtualenv-15.1.0
python3 setup.py install
# 创建虚拟环境
virtualenv -p python3 venv
. venv/bin/activate
# 安排离线依赖
cd pip_package/
pip install --no-index --find-links="./" -r requirements.txt

# 安装nodejs
mv node-v4.2.6-linux-x64.tar /opt/
cd /opt/
tar -zxvf node-v4.2.6-linux-x64.tar
sudo ln -s /opt/node-v4.2.6-linux-x64/bin/node /usr/local/bin/node
sudo ln -s /opt/node-v4.2.6-linux-x64/bin/npm /usr/local/bin/npm

# 安装依赖
pip install -r requirements.txt
# 构建静态文件
npm run build 
# 安装主程序
pip install .
# 配置文件
cd notebook_dataset
jupyter notebook --generate-config  
mkdir -p ~/.ipython/profile_default/startup/
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/ 
mkdir -p ~/.jupyter/
cp ipynb_demo/jupyter_notebook_config.py ~/.jupyter/
# 添加环境变量
export cubo_host="http://localhost:8092"
export cubo_hdfs_client_host="http://localhost:50070"
```

### 在线安装
```
# 拉取项目
git clone http://192.168.10.202:666/nickliqian/notebook_dataset.git
# 进入虚拟环境
# 安装依赖
pip install -r requirements.txt
# 构建静态文件
npm run build 
# 安装主程序
pip install .
# 配置文件
cd notebook_dataset
jupyter notebook --generate-config  
mkdir -p ~/.ipython/profile_default/startup/
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/ 
mkdir -p ~/.jupyter/
cp ipynb_demo/jupyter_notebook_config.py ~/.jupyter/
# 添加环境变量
export cubo_host="http://localhost:8092"
export cubo_hdfs_client_host="http://localhost:50070"
```

## Update
```
git pull
# 构建静态文件
npm run build 
# 安装主程序
pip install .
```

## Run
```
jupyter notebook
```

## Issue
### 读取partuet文件时会遇到依赖问题
读取partuet文件时会遇到依赖问题，需要安装python-snappy，依赖如下：
```
DEB-based: sudo apt-get install libsnappy-dev
RPM-based: sudo yum install libsnappy-devel
Brew:  brew install snappy
# https://stackoverflow.com/questions/11416024/error-installing-python-snappy-snappy-c-h-no-such-file-or-directory
```

### tornado版本问题
tornado==5.0.2 应该使用低版本

### 区分python3.5和3.6
以下包需要区分python3.5和3.6的check point
```
kiwisolver==1.0.1
llvmlite==0.28.0
MarkupSafe==1.1.1
matplotlib==3.0.3
numba==0.43.1
numpy==1.16.2
pandas==0.24.2
pymssql==2.1.4
pyzmq==18.0.1
autopep8==1.3.3
```


# Jupyter Notebook
**From Official**  

[![Google Group](https://img.shields.io/badge/-Google%20Group-lightgrey.svg)](https://groups.google.com/forum/#!forum/jupyter)
[![Build Status](https://travis-ci.org/jupyter/notebook.svg?branch=master)](https://travis-ci.org/jupyter/notebook)
[![Documentation Status](https://readthedocs.org/projects/jupyter-notebook/badge/?version=latest)](http://jupyter-notebook.readthedocs.io/en/latest/?badge=latest)
                


The Jupyter notebook is a web-based notebook environment for interactive
computing.

![Jupyter notebook example](docs/resources/running_code_med.png "Jupyter notebook example")

### Jupyter notebook, the language-agnostic evolution of IPython notebook
Jupyter notebook is a language-agnostic HTML notebook application for
Project Jupyter. In 2015, Jupyter notebook was released as a part of
The Big Split™ of the IPython codebase. IPython 3 was the last major monolithic
release containing both language-agnostic code, such as the *IPython notebook*,
and language specific code, such as the *IPython kernel for Python*. As
computing spans across many languages, Project Jupyter will continue to develop the
language-agnostic **Jupyter notebook** in this repo and with the help of the
community develop language specific kernels which are found in their own
discrete repos.
[[The Big Split™ announcement](https://blog.jupyter.org/the-big-split-9d7b88a031a7)]
[[Jupyter Ascending blog post](https://blog.jupyter.org/jupyter-ascending-1bf5b362d97e)]

## Installation
You can find the installation documentation for the
[Jupyter platform, on ReadTheDocs](https://jupyter.readthedocs.io/en/latest/install.html).
The documentation for advanced usage of Jupyter notebook can be found
[here](https://jupyter-notebook.readthedocs.io/en/latest/).

For a local installation, make sure you have
[pip installed](https://pip.readthedocs.io/en/stable/installing/) and run:

    $ pip install notebook

## Usage - Running Jupyter notebook

### Running in a local installation

Launch with:

    $ jupyter notebook

## Development Installation

See [`CONTRIBUTING.rst`](CONTRIBUTING.rst) for how to set up a local development installation.

## Contributing

If you are interested in contributing to the project, see [`CONTRIBUTING.rst`](CONTRIBUTING.rst).

## Resources
- [Project Jupyter website](https://jupyter.org)
- [Online Demo at try.jupyter.org](https://try.jupyter.org)
- [Documentation for Jupyter notebook](https://jupyter-notebook.readthedocs.io/en/latest/) [[PDF](https://media.readthedocs.org/pdf/jupyter-notebook/latest/jupyter-notebook.pdf)]
- [Korean Version of Installation](https://github.com/ChungJooHo/Jupyter_Kor_doc/)
- [Documentation for Project Jupyter](https://jupyter.readthedocs.io/en/latest/index.html) [[PDF](https://media.readthedocs.org/pdf/jupyter/latest/jupyter.pdf)]
- [Issues](https://github.com/jupyter/notebook/issues)
- [Technical support - Jupyter Google Group](https://groups.google.com/forum/#!forum/jupyter)
