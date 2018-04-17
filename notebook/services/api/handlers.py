"""Tornado handlers for api specifications."""

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

from itertools import chain
import json

from tornado import gen, web

from ...base.handlers import IPythonHandler, APIHandler
from notebook._tz import utcfromtimestamp, isoformat

import os

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


class APIImportParamsToFile(APIHandler):

    @web.authenticated
    @gen.coroutine
    def get(self):

        dataframe = self.get_argument("dataframe")
        variable = self.get_argument("variable")
        label = self.get_argument("label")
        no_default = self.get_argument("no_default")
        default = self.get_argument("default")
        bins = self.get_argument("bins")
        print("-->dataframe".format(dataframe))
        print("-->variable".format(variable))
        data = dict(
            a="a",
            b="b",
            dataframe=dataframe,
            variable=variable,
            label=label,
            no_default=no_default,
            default=default,
            bins=bins,
        )
        print(data)
        self.write(data)


# CHANGE: Add new api...
default_handlers = [
    (r"/api/spec.yaml", APISpecHandler),
    (r"/api/status", APIStatusHandler),
    (r"/api/importDefault", APIImportParamsToFile),
]
