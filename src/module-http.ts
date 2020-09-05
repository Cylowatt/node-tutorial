import http from 'http';

// Create server object.
http
  .createServer((req, res) => {
    // Write response.
    res.write('Hello, World');
    res.end();
  })
  .listen(5050, () => console.log('Server on 5050'));
