"""Tornado handlers for api specifications."""

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

from itertools import chain
import json

from tornado import gen, web

from ...base.handlers import IPythonHandler, APIHandler
from notebook._tz import utcfromtimestamp, isoformat

import os
import requests



class APISpecHandler(web.StaticFileHandler, IPythonHandler):

    def initialize(self):
        web.StaticFileHandler.initialize(self, path=os.path.dirname(__file__))

    @web.authenticated
    def get(self):
        self.log.warning("Serving api spec (experimental, incomplete)")
        return web.StaticFileHandler.get(self, 'api.yaml')
        
    def get_content_type(self):
        return 'text/x-yaml'

class APIStatusHandler(APIHandler):

    _track_activity = False

    @web.authenticated
    @gen.coroutine
    def get(self):
        # if started was missing, use unix epoch
        started = self.settings.get('started', utcfromtimestamp(0))
        started = isoformat(started)

        kernels = yield gen.maybe_future(self.kernel_manager.list_kernels())
        total_connections = sum(k['connections'] for k in kernels)
        last_activity = isoformat(self.application.last_activity())
        model = {
            'started': started,
            'last_activity': last_activity,
            'kernels': len(kernels),
            'connections': total_connections,
        }
        self.finish(json.dumps(model, sort_keys=True))


# discard this class
class APIImportParamsToFile(APIHandler):

    @web.authenticated
    @gen.coroutine
    def get(self):

        target = self.get_argument("target")

        # CHANGE: boxing data
        if target == "boxing":
            dataframe = self.get_argument("dataframe")
            variable = self.get_argument("variable")
            label = self.get_argument("label")
            no_default = self.get_argument("no_default")
            default = self.get_argument("default")
            bins = self.get_argument("bins")

            with open("./default.ipynb", "r", encoding="utf-8") as f:
                origin = f.read()
            cell = json.loads(origin)

            obj = {
                "cell_type": "code",
                "execution_count": "null",
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Feature boxing\n"
                    "params = dict(\n"
                    "    dataframe=\"{}\",\n".format(dataframe),
                    "    variable=\"{}\",\n".format(variable),
                    "    label=\"{}\",\n".format(label),
                    "    no_default={},\n".format(no_default),
                    "    default={},\n".format(default),
                    "    bins={}\n".format(bins),
                    ")\n"
                    "params"
                ]
            }
            cell["cells"].insert(0, obj)

            result = json.dumps(cell, ensure_ascii=False).replace('"null"', 'null')

            with open("./default.ipynb", "w", encoding="utf-8") as f:
                f.write(result)

        # CHANGE: split data
        if target == "split":
            dataframe = self.get_argument("dataframe")
            ratio = self.get_argument("ratio")
            seed = self.get_argument("seed")

            with open("./default.ipynb", "r", encoding="utf-8") as f:
                origin = f.read()
            cell = json.loads(origin)

            obj = {
                "cell_type": "code",
                "execution_count": "null",
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Feature split\n"
                    "params = dict(\n"
                    "    dataframe=\"{}\",\n".format(dataframe),
                    "    ratio=\"{}\",\n".format(ratio),
                    "    seed=\"{}\",\n".format(seed),
                    ")\n"
                    "params"
                ]
            }
            cell["cells"].insert(0, obj)

            result = json.dumps(cell, ensure_ascii=False).replace('"null"', 'null')

            with open("./default.ipynb", "w", encoding="utf-8") as f:
                f.write(result)

        # CHANGE: RFE data
        if target == "RFE":
            dataframe = self.get_argument("dataframe")
            to_select = self.get_argument("to_select")
            label = self.get_argument("label")
            feature = self.get_argument("feature")
            estimator = self.get_argument("estimator")

            with open("./default.ipynb", "r", encoding="utf-8") as f:
                origin = f.read()
            cell = json.loads(origin)

            obj = {
                "cell_type": "code",
                "execution_count": "null",
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Feature RFE\n"
                    "params = dict(\n"
                    "    dataframe=\"{}\",\n".format(dataframe),
                    "    to_select=\"{}\",\n".format(to_select),
                    "    label=\"{}\",\n".format(label),
                    "    feature=\"{}\",\n".format(feature),
                    "    estimator=\"{}\",\n".format(estimator),
                    ")\n"
                    "params"
                ]
            }
            cell["cells"].insert(0, obj)

            result = json.dumps(cell, ensure_ascii=False).replace('"null"', 'null')

            with open("./default.ipynb", "w", encoding="utf-8") as f:
                f.write(result)

        # CHANGE: fit data
        if target == "fit":
            train = self.get_argument("train")
            test = self.get_argument("test")
            label = self.get_argument("label")
            algo = self.get_argument("algo")
            path = self.get_argument("path")

            with open("./default.ipynb", "r", encoding="utf-8") as f:
                origin = f.read()
            cell = json.loads(origin)

            obj = {
                "cell_type": "code",
                "execution_count": "null",
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Feature fit\n"
                    "params = dict(\n"
                    "    train=\"{}\",\n".format(train),
                    "    test=\"{}\",\n".format(test),
                    "    label=\"{}\",\n".format(label),
                    "    algo=\"{}\",\n".format(algo),
                    "    path=\"{}\",\n".format(path),
                    ")\n"
                    "params"
                ]
            }
            cell["cells"].insert(0, obj)

            result = json.dumps(cell, ensure_ascii=False).replace('"null"', 'null')

            with open("./default.ipynb", "w", encoding="utf-8") as f:
                f.write(result)

        # CHANGE: save data
        if target == "save":
            model = self.get_argument("model")
            train = self.get_argument("train")
            test = self.get_argument("test")
            label = self.get_argument("label")
            path = self.get_argument("path")

            with open("./default.ipynb", "r", encoding="utf-8") as f:
                origin = f.read()
            cell = json.loads(origin)

            obj = {
                "cell_type": "code",
                "execution_count": "null",
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Feature save\n"
                    "params = dict(\n"
                    "    model=\"{}\",\n".format(model),
                    "    train=\"{}\",\n".format(train),
                    "    test=\"{}\",\n".format(test),
                    "    label=\"{}\",\n".format(label),
                    "    path=\"{}\",\n".format(path),
                    ")\n"
                    "params"
                ]
            }
            cell["cells"].insert(0, obj)

            result = json.dumps(cell, ensure_ascii=False).replace('"null"', 'null')

            with open("./default.ipynb", "w", encoding="utf-8") as f:
                f.write(result)

        self.write({"target": target})


class DataSetList(APIHandler):

    @web.authenticated
    @gen.coroutine
    def get(self):
        import requests

        if False:
            result = {
                "list": [
                    {"sourceName": "测试源", "category": "mysql", "createTime": "2018-03-18", "updateTime": "2018-03-18", "connParams": {"url": "url"}},
                    {"sourceName": "测试源", "category": "mysql", "createTime": "2018-03-18", "updateTime": "2018-03-18", "connParams": {"url": "url"}},
                    {"sourceName": "测试源", "category": "mysql", "createTime": "2018-03-18", "updateTime": "2018-03-18", "connParams": {"url": "url"}},
                    {"sourceName": "测试源", "category": "mysql", "createTime": "2018-03-18", "updateTime": "2018-03-18", "connParams": {"url": "url"}},
                    {"sourceName": "测试源", "category": "mysql", "createTime": "2018-03-18", "updateTime": "2018-03-18", "connParams": {"url": "url"}}
                ]
            }
            self.write(result)
        else:
            url = "{}/cubo//dsList".format(os.getenv("cubo_api") or "http://192.168.10.203:8092")

            payload = "order=desc&offset=0&limit=50"
            headers = {
                'Accept': "application/json, text/javascript, */*; q=0.01",
                'Accept-Encoding': "gzip, deflate",
                'Accept-Language': "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                'Cache-Control': "no-cache",
                'Connection': "keep-alive",
                'Content-Length': "28",
                'Content-Type': "application/x-www-form-urlencoded",
                'Host': "192.168.10.204:8092",
                'Origin': "http://192.168.10.203:8092",
                'Pragma': "no-cache",
                'Referer': "http://192.168.10.203:8092/cubo/ds",
                'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
                'X-Requested-With': "XMLHttpRequest",
                'Postman-Token': "7b235144-e7e6-4f7d-9fba-6afe88c0c16c"
            }

            response = requests.request("POST", url, data=payload, headers=headers, timeout=60)

            self.write(response.json())


# CHANGE: Add new api...
default_handlers = [
    (r"/api/spec.yaml", APISpecHandler),
    (r"/api/status", APIStatusHandler),
    # (r"/api/importDefault", APIImportParamsToFile),
    (r"/api/dataset_list", DataSetList),
]
