const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');
const DATA_FILE = path.join(ROOT, 'data', 'work_orders.csv');

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function contentTypeFor(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.csv')) return 'text/csv; charset=utf-8';
  return 'application/octet-stream';
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/work-orders') {
    serveFile(res, DATA_FILE, 'text/csv; charset=utf-8');
    return;
  }

  if (req.method === 'POST' && req.url === '/api/escalate') {
    try {
      const body = await parseBody(req);
      const required = ['workOrderId', 'priority', 'assetId', 'dueDate'];
      const missing = required.filter(key => !body[key]);
      if (missing.length) {
        sendJson(res, 400, { success: false, message: `Missing fields: ${missing.join(', ')}` });
        return;
      }

      const escalationId = `ESC-${Math.floor(10000 + Math.random() * 90000)}`;
      sendJson(res, 200, {
        success: true,
        escalationId,
        message: 'Work order escalated successfully',
        received: body,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      sendJson(res, 400, { success: false, message: 'Invalid JSON request body' });
    }
    return;
  }

  let requestPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const safePath = path.normalize(requestPath).replace(/^\/+/, '');
  const filePath = path.join(FRONTEND, safePath);

  if (!filePath.startsWith(FRONTEND)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  serveFile(res, filePath, contentTypeFor(filePath));
});

server.listen(PORT, () => {
  console.log(`Demo server running at http://localhost:${PORT}`);
});
