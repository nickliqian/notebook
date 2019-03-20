#!/usr/bin/python
# -*- coding: UTF-8 -*-
import hdfs
import requests
from fastparquet import ParquetFile
from io import BytesIO, BufferedReader
import pandas as pd


# 解析配置
file_path = ""
file_type = "csv"
path = "hdfs_test_file.csv"

# 根据格式读取数据
if file_path.startswith("hdfs://"):
    # 客户端
    client = hdfs.Client("http://192.168.10.203:50070")
    with client.read(path) as reader:
        result = reader.read()  # bytes
else:
    with open(path, "rb") as f:
        result = f.read()  # bytes

# load 数据
if file_type == "csv":
    df = pd.read_csv(BufferedReader(BytesIO(result)))
elif file_type == "json":
    df = pd.read_json(BufferedReader(BytesIO(result)))
elif file_type == "parquet":
    pf = ParquetFile(BufferedReader(BytesIO(result)))
    df = pf.to_pandas()
else:
    print("警告：请输入正确的文件类型")
    df = ""

print(df)


# client = hdfs.Client("http://192.168.10.203:50070")
# path = "/tmp/zyf/hbaseData/part-00069-ecbe172d-72f4-4d8d-877a-ee5ef66f2b37-c000.snappy.parquet"
# with client.read(path) as reader:
#     result = reader.read()
#     pf = ParquetFile(BufferedReader(BytesIO(result)))
#
#     df = pf.to_pandas()
#     print(df)