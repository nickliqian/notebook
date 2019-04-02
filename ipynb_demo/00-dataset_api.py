#!/usr/bin/python
# -*- coding: UTF-8 -*-
import json
import warnings
import pandas as pd
import numpy as np
import pymysql
import pymssql
import re
import matplotlib.pyplot as plt
import hdfs
import requests
from fastparquet import ParquetFile
from io import BytesIO, BufferedReader
import os


warnings.filterwarnings("ignore")


class SJSLoadData(object):
    def __init__(self):
        self.cubo_host = os.getenv("cubo_host", "http://locahost:9082")
        self.cubo_hdfs_client_host = os.getenv("cubo_hdfs_client_host", "http://locahost:50070")

    @staticmethod
    def test(name):
        print("[INFO] Test print name:{}".format(name))

    def load_data_set(self, source_id):
        # 获取指定数据源的详细信息
        config_data = self.get_source_detail(source_id)
        data_type = config_data["category"]
        print("[INFO] Data Type:<{}> Source Id:<{}>".format(data_type, source_id))

        df = None
        # 全部转为小写来识别
        data_type = str.lower(data_type)
        if data_type == "file":
            pass
        elif data_type == "mysql":
            df = self.read_mysql(config_data)
        elif data_type == "hbase":
            pass
        elif data_type == "sqlserver":
            df = self.read_sqlserver(config_data)
        elif data_type == "hive":
            pass
        elif data_type == "kafka":
            pass
        elif data_type == "neo4j":
            pass
        else:
            print("[WARNING]: 请输入正确的数据源类型")
            return
        return df

    def get_source_detail(self, source_id):
        print("[INFO] Get Source Id:<{}> for data source connection info".format(source_id))
        url = "{}/cubo/source/get/{}".format(self.cubo_host, source_id)
        response = requests.get(url=url, timeout=8)
        config_data = response.json()
        return config_data

    def read_file(self, config_data):
        # 读取配置
        conn_params = config_data["connParams"]
        conn_url = conn_params["url"]
        conn_url = {"type": "Parquet", "path": "/tmp/zyf/hbaseData", "partitions": "1", "mode": "overwrite"}

        # 解析配置
        file_path = conn_url["path"]
        file_type = str.lower(conn_url["type"])

        # 根据格式读取数据
        if file_path.startswith("hdfs"):
            # 客户端
            client = hdfs.Client(self.hdfs_client_host)
            file_path = file_path.replace("hdfs://", "")
            with client.read(file_path) as reader:
                result = reader.read()  # bytes
        else:
            with open(file_path, "rb") as f:
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
            print("[WARNING]: 请输入正确的文件类型")
            return
        return df

    @staticmethod
    def read_mysql(config_data):
        # 获取数据
        conn_params = json.loads(config_data["connParams"])
        conn_url = conn_params["url"]
        # 解析数据
        host = re.findall(r"://(.*?):", conn_url)[0]
        port = int(re.findall(r"mysql://.*?:(.*?)/.*?\?", conn_url)[0])
        username = conn_params["user"]
        password = conn_params["password"]
        db_name = re.findall(r"://.*?:.*?/(.*?)\?", conn_url)[0]
        table_name = config_data["tableName"]
        # 链接数据源
        print("[INFO] Config: host:{}, port:{}, username:{}, password:{}, db_name:{}, table_name:{}"
              .format(host, port, username, password, db_name, table_name))
        conn = pymysql.connect(host=host, port=port, user=username, passwd=password, db=db_name)
        df = pd.read_sql('select * from {}'.format(table_name), con=conn)
        conn.close()
        return df

    @staticmethod
    def read_hbase(config_data):
        return

    @staticmethod
    def read_sqlserver(config_data):
        # 获取数据
        conn_params = json.loads(config_data["connParams"])
        conn_url = conn_params["url"]
        # 解析数据
        host = re.findall(r"://(.*?):", conn_url)[0]
        port = int(re.findall(r"//.*?:(.*?);database", conn_url)[0])
        username = conn_params["user"]
        password = conn_params["password"]
        db_name = re.findall(r"database=(.*?)$", conn_url)[0]
        table_name = config_data["tableName"]
        # 链接数据源
        print("[INFO] Config: host:{}, port:{}, username:{}, password:{}, db_name:{}, table_name:{}"
              .format(host, port, username, password, db_name, table_name))
        conn = pymssql.connect(host=host, port=port, user=username, password=password, database=db_name)
        df = pd.read_sql('select * from {}'.format(table_name), con=conn)
        conn.close()
        return df

    @staticmethod
    def read_hive(config_data):
        return

    @staticmethod
    def read_kafka(config_data):
        return

    @staticmethod
    def read_neo4j(config_data):
        return

    @staticmethod
    def draw_figure(df):
        plt.figure()
        df_group = df.groupby("age")["age"].agg(["len"])
        # 条形图
        plt.bar(df_group.index.values, df_group["len"])
        # 箱图
        plt.boxplot(df["age"])
        df.boxplot(column="age", by="y")
        # 散点图和折线图
        plt.scatter(df["age"], df["balance"])
        plt.plot(df["age"], df["balance"], ".")
        plt.plot(df["age"], df["balance"])
        # 直方图
        plt.hist(df["age"], bins=[0, 18, 37, 50, 95], histtype="bar", rwidth=0.8)

    @staticmethod
    def draw_bar(df, x_field=None, y_field=None):
        if x_field:
            x = df[x_field]
        else:
            x = df.index
        y = df[y_field]
        plt.bar(x, y)
        plt.show()

    @staticmethod
    def draw_box(df, value_field):
        plt.boxplot(df[value_field])
        plt.show()

    @staticmethod
    def draw_points(df, x_field=None, y_field=None):
        if x_field:
            x = df[x_field]
        else:
            x = df.index
        y = df[y_field]
        plt.plot(x, y, ".")
        plt.show()

    @staticmethod
    def draw_lines(df, x_field=None, y_field=None):
        if x_field:
            x = df[x_field]
        else:
            x = df.index
        y = df[y_field]
        plt.plot(x, y)
        plt.show()

    @staticmethod
    def draw_hist(df, value_field, bins, rwidth):
        plt.hist(df[value_field], bins=bins, histtype="bar", rwidth=rwidth)
        plt.show()


def main():
    # read_sqlserver(config_data)

    # mysql
    # config_data = {"creator": "1", "createTime": "2019-03-11 15:17:49", "updateTime": "2019-03-11 15:17:49",
    #                "delFlag": "0",
    #                "sourceId": 21, "sourceName": "mysql1", "category": "MySQL", "tableName": "notebook_test",
    #                "aliasName": "notebook_test",
    #                "connParams": "{\"url\":\"jdbc:mysql://192.168.20.14:3306/guns?useSSL=false\",\"user\":\"fenxi\",\"password\":\"Feixi@123\"}",
    #                "colMapping": ""}
    # ddf = read_mysql(config_data)
    # print(ddf)

    # sqlserver
    # config_data = {"creator": "1", "createTime": "2019-03-11 15:17:49", "updateTime": "2019-03-11 15:17:49",
    #                "delFlag": "0",
    #                "sourceId": 21, "sourceName": "mysql1", "category": "MySQL", "tableName": "notebook_test",
    #                "aliasName": "user_info",
    #                "connParams": "{\"url\":\"jdbc:mysql://192.168.20.14:3306/guns?useSSL=false\",\"user\":\"fenxi\",\"password\":\"Feixi@123\"}",
    #                "colMapping": ""}
    # ddf = read_sqlserver(config_data)
    # print(ddf)

    # hdfs
    # config_data = {"creator": "1", "createTime": "2019-03-11 15:17:49", "updateTime": "2019-03-11 15:17:49",
    #                "delFlag": "0",
    #                "sourceId": 21, "sourceName": "mysql1", "category": "MySQL", "tableName": "notebook_test",
    #                "aliasName": "user_info",
    #                "connParams": "{\"url\":\"jdbc:mysql://192.168.20.14:3306/guns?useSSL=false\",\"user\":\"fenxi\",\"password\":\"Feixi@123\"}",
    #                "colMapping": ""}
    # r = read_hdfs(config_data)
    # print(r)

    # dff = pd.DataFrame(np.random.randint(50, size=(10, 2)), index=list(range(10)), columns=["day_1", "day_2"])
    # print(dff)
    # plt.bar(dff["day_2"], dff["day_1"])
    # plt.boxplot(dff["day_1"])
    # plt.scatter(dff["day_1"], dff["day_2"])
    # plt.plot(dff["day_1"], dff["day_2"], ".")
    # plt.plot(dff.index, dff["day_2"])
    # plt.hist(dff["day_1"], bins=[0, 18, 37, 50, 95], histtype="bar", rwidth=0.6)
    # plt.show()

    client = hdfs.Client("http://192.168.10.204:50070")
    with client.read("/tmp/hdfs_test_file.csv") as reader:
        df = pd.read_csv(reader)

    pass


if __name__ == '__main__':
    sjs_load_data = SJSLoadData()
