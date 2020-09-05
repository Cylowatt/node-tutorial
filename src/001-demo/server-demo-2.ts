import http, { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const filePath = getPublicFilePath(req);
  const contentType = determineContentTypeFrom(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.readFile(get404FilePath(), (_, errorPage) => {
          attachHtmlHeader(res, 404).end(errorPage);
        });
      } else {
        attachHtmlHeader(res, 500).end(`<h1>RIP Server: ${err.code}</h1>`);
      }

      return;
    }

    attachContentTypeHeader(res, contentType).end(content);
  });
});

function getPublicFilePath(req: IncomingMessage): string {
  const fileName = req.url === '/' ? 'index.html' : req.url || '';
  return path.join(__dirname, 'public', fileName);
}

function determineContentTypeFrom(filePath: string): string {
  const extName = path.extname(filePath);

  switch (extName) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.png':
      return 'image/png';
    case '.jpeg':
    case '.jpg':
      return 'image/jpg';
    default:
      return 'text/html';
  }
}

function get404FilePath(): string {
  return path.join(__dirname, 'public', '404.html');
}

function attachHtmlHeader(res: ServerResponse, statusCode = 200): ServerResponse {
  return attachContentTypeHeader(res, 'text/html', statusCode);
}

function attachContentTypeHeader(res: ServerResponse, contentType: string, statusCode = 200): ServerResponse {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  return res;
}

const NODE_PORT = process.env.PORT || 5050;
server.listen(NODE_PORT, () => console.log(`[server]: Server runs at http://localhost:${NODE_PORT}`));
