#!/usr/bin/python
# -*- coding: UTF-8 -*-
import pandas as pd
import numpy as np
import pymysql
import pymssql


def test(name):
    print(name)
    print("hahahah")


def read_mysql(url, tablename):
    host = ""
    port = ""
    username = ""
    db_name = ""
    table_name = ""
    conn = pymysql.connect(host=host, port=port, user=username, passwd=password, db=db_name)
    df = pd.read_sql('select * from {}'.format(table_name), con=conn)
    conn.close()
    return df


def read_sqlserver(url, tablename):
    host = ""
    port = ""
    username = ""
    db_name = ""
    table_name = ""
    conn = pymssql.connect(host=host, port=port, user=username, password=password, database=database)
    df = pd.read_sql('select * from {}'.format(table_name), con=conn)
    conn.close()
    return df

