#!/usr/bin/python
# -*- coding: UTF-8 -*-
import warnings
import pandas as pd
import numpy as np
import pymysql
import pymssql
import re
import matplotlib.pyplot as plt

warnings.filterwarnings("ignore")


def test(name):
    print(name)
    print("hahahah")


def load_data_set(source_id):
    # 获取指定数据源的详细信息
    config_data = get_source_detail(source_id)
    data_type = config_data["category"]
    print("data_type:{} source_id:{}".format(data_type, source_id))

    df = None
    # 全部转为小写来识别
    data_type = str.lower(data_type)
    if data_type == "file":
        pass
    elif data_type == "mysql":
        df = read_mysql(config_data)
    elif data_type == "hbase":
        pass
    elif data_type == "sqlserver":
        df = read_sqlserver(config_data)
    elif data_type == "hive":
        pass
    elif data_type == "kafka":
        pass
    elif data_type == "neo4j":
        pass
    else:
        print("请输入正确的类型")
        return
    return df


def get_source_detail(source_id):
    print("get <source_id:{}> source connection info".format(source_id))
    # mysql
    config_data = {"creator": "1", "createTime": "2019-03-11 15:17:49", "updateTime": "2019-03-11 15:17:49",
                   "delFlag": "0",
                   "sourceId": 21, "sourceName": "mysql1", "category": "MySQL", "tableName": "notebook_test",
                   "aliasName": "notebook_test",
                   "connParams": "{\"url\":\"jdbc:mysql://192.168.20.14:3306/guns?useSSL=false\",\"user\":\"fenxi\",\"password\":\"Feixi@123\"}",
                   "colMapping": ""}
    return config_data


def read_file(config_data):
    return


def read_mysql(config_data):
    # 获取数据
    # conn_params = config_data["connParams"]
    conn_params = {"url": "jdbc:mysql://192.168.10.204:3306/cubo?useUnicode=true&characterEncoding=utf-8",
                   "user": "fenxi", "password": "fenxi@123"}
    conn_url = conn_params["url"]
    # 解析数据
    host = re.findall(r"://(.*?):", conn_url)[0]
    port = int(re.findall(r"mysql://.*?:(.*?)/.*?\?", conn_url)[0])
    username = conn_params["user"]
    password = conn_params["password"]
    db_name = re.findall(r"://.*?:.*?/(.*?)\?", conn_url)[0]
    table_name = config_data["tableName"]
    # 链接数据源
    print(host, port, username, password, db_name, table_name)
    conn = pymysql.connect(host=host, port=port, user=username, passwd=password, db=db_name)
    df = pd.read_sql('select * from {}'.format(table_name), con=conn)
    conn.close()
    print(df)
    return df


def read_hbase(config_data):
    return


def read_sqlserver(config_data):
    # 获取数据
    conn_params = config_data["connParams"]
    conn_params = {"url": "jdbc:sqlserver://192.168.10.58:1433;database=my_sql_server", "user": "fenxi",
                   "password": "Fenxi@123"}
    conn_url = conn_params["url"]
    # 解析数据
    host = re.findall(r"://(.*?):", conn_url)[0]
    port = int(re.findall(r"//.*?:(.*?);database", conn_url)[0])
    username = conn_params["user"]
    password = conn_params["password"]
    db_name = re.findall(r"database=(.*?)$", conn_url)[0]
    table_name = config_data["tableName"]
    # 链接数据源
    print(host, port, username, password, db_name, table_name)
    conn = pymssql.connect(host=host, port=port, user=username, password=password, database=database)
    df = pd.read_sql('select * from {}'.format(table_name), con=conn)
    conn.close()
    return df


def read_hive(config_data):
    return


def read_kafka(config_data):
    return


def read_neo4j(config_data):
    return


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


def draw_bar(df, x_field=None, y_field=None):
    if x_field:
        x = df[x_field]
    else:
        x = df.index
    y = df[y_field]
    plt.bar(x, y)
    plt.show()


def draw_box(df, value_field):
    plt.boxplot(df[value_field])
    plt.show()


def draw_points(df, x_field=None, y_field=None):
    if x_field:
        x = df[x_field]
    else:
        x = df.index
    y = df[y_field]
    plt.plot(x, y, ".")
    plt.show()


def draw_lines(df, x_field=None, y_field=None):
    if x_field:
        x = df[x_field]
    else:
        x = df.index
    y = df[y_field]
    plt.plot(x, y)
    plt.show()


def draw_hist(df, value_field, bins, rwidth):
    plt.hist(df[value_field], bins=bins, histtype="bar", rwidth=rwidth)
    plt.show()


if __name__ == '__main__':
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

    dff = pd.DataFrame(np.random.randint(50, size=(10, 2)), index=list(range(10)), columns=["day_1", "day_2"])
    print(dff)
    # plt.bar(dff["day_2"], dff["day_1"])
    # plt.boxplot(dff["day_1"])
    # plt.scatter(dff["day_1"], dff["day_2"])
    # plt.plot(dff["day_1"], dff["day_2"], ".")
    # plt.plot(dff.index, dff["day_2"])
    plt.hist(dff["day_1"], bins=[0, 18, 37, 50, 95], histtype="bar", rwidth=0.6)
    plt.show()
