#!/usr/bin/env bash
nb_dir="/opt/"
cd $nb_dir
sudo ln -s $nb_dir/notebook_package/dep/node-v4.2.6-linux-x64/bin/node /usr/local/bin/node
sudo ln -s $nb_dir/notebook_package/dep/node-v4.2.6-linux-x64/bin/npm /usr/local/bin/npm

cd notebook_package/notebook_dataset
pip install .
npm run build
jupyter notebook --generate-config
cp ipynb_demo/00-dataset_api.py ~/.ipython/profile_default/startup/;
cp ipynb_demo/jupyter_notebook_config.py ~/.jupyter/;