import http.server
import os
import sys
import mimetypes
from pathlib import Path

class NoCacheHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.serve_file()

    def do_HEAD(self):
        self.serve_file(head_only=True)

    def serve_file(self, head_only=False):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            for index in ('index.html', 'index.htm'):
                candidate = os.path.join(path, index)
                if os.path.exists(candidate):
                    path = candidate
                    break
            else:
                self.send_error(404)
                return

        if not os.path.exists(path):
            self.send_error(404)
            return

        ctype, _ = mimetypes.guess_type(path)
        ctype = ctype or 'application/octet-stream'
        data = Path(path).read_bytes()

        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.end_headers()
        if not head_only:
            self.wfile.write(data)

    def translate_path(self, path):
        path = path.split('?', 1)[0].split('#', 1)[0]
        path = path.lstrip('/')
        return os.path.join(os.getcwd(), path) if path else os.getcwd()

    def log_message(self, format, *args):
        print(f"{args[0]} {args[1]}")

port = int(sys.argv[1]) if len(sys.argv) > 1 else 3456
http.server.test(HandlerClass=NoCacheHandler, port=port, bind='')
