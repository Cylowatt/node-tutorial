import http, { ServerResponse } from 'http';
import path from 'path';
import fs from 'fs';
import ErrnoException = NodeJS.ErrnoException;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      serveHomePage(res).then(() => res.end());
      break;
    case '/about':
      serveAboutPage(res).then(() => res.end());
      break;
    default:
      attachHtmlHeader(res, 404).write('<h1>Page not found</h1>');
      res.end();
  }
});

function serveHomePage(res: ServerResponse): Promise<any> {
  return readPublicFile('index.html')
    .then(data => {
      attachHtmlHeader(res).write(data);
    })
    .catch(err => handleHtmlError(err, res));
}

function readPublicFile(fileName: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'public', fileName), (err, data) => (err ? reject(err) : resolve(data)));
  });
}

function attachHtmlHeader(res: ServerResponse, statusCode = 200): ServerResponse {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  return res;
}

function handleHtmlError(err: ErrnoException, res: ServerResponse): void {
  res.writeHead(500);
  res.write(`<p>${err.name}</p>`);
}

function serveAboutPage(res: ServerResponse): Promise<any> {
  return readPublicFile('about.html')
    .then(data => {
      attachHtmlHeader(res).write(data);
    })
    .catch(err => handleHtmlError(err, res));
}

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`[server]: Server runs at http://localhost:${PORT}`));
