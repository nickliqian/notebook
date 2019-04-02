c.NotebookApp.tornado_settings = {
      'headers': {
            'Content-Security-Policy': "frame-ancestors self *; report-uri /api/security/csp-report",
      }
}
c.NotebookApp.ip = '*'
c.NotebookApp.port = 9123
c.NotebookApp.open_browser = False
c.NotebookApp.token = ""
c.NotebookApp.terminals_enabled = False
c.NotebookApp.allow_password_change = False
c.NotebookApp.quit_button = False
c.NotebookApp.notebook_dir = "workspace"
# c.NotebookApp.cubo_host = "http://locahost:9082"
# c.NotebookApp.hdfs_client_host = "http://locahost:50070"
# c.NotebookApp.certfile = u'/root/.jupyter/mycert.pem'
