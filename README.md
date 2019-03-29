# Jupyter Notebook

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

## dev mode command
`sudo npm run build:watch`  
`jupyter notebook --debug --no-browser`  
[启动ipython或python解释器自动导入组件（例如：numpy）](https://blog.csdn.net/xlinsist/article/details/51168892)  
`.ipython\profile_default\startup` 在这个路径里面放置文件，加载内核的时候会主动执行。  
`.jupyter\\jupyter_notebook_config.py` 此文件是`jupyter notebook`的配置文件
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

# install
`pip install requests pandas matplotlib pymysql mssql`  
`git pull; pip instal .`  

读取partuet文件时会遇到依赖问题，需要安装python-snappy，依赖如下：
```
DEB-based: sudo apt-get install libsnappy-dev
RPM-based: sudo yum install libsnappy-devel
Brew:  brew install snappy
# https://stackoverflow.com/questions/11416024/error-installing-python-snappy-snappy-c-h-no-such-file-or-directory
```

# run
```
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/;
npm run build;
jupyter notebook
```

# start.sh
git clone http://192.168.10.202:666/nickliqian/notebook_dataset.git  
cd notebook_dataset  
pip install -r requirements.txt  
git pull;  
workon nb_1  
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/;  
cp ipynb_demo/jupyter_notebook_config.py ~/.jupyter/;  
python setup.py build;  
npm run build;  
pip install .;  
jupyter notebook;  


// export cubo_api="http://192.168.10.203:8092"  
