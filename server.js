import http from 'node:http';
import { readFile } from 'node:fs/promises';
const types = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript' };
http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const file = path === '/' ? 'index.html' : path.slice(1);
  if (!['index.html', 'style.css', 'app.js'].includes(file)) { res.writeHead(404); res.end(); return; }
  try { res.setHeader('Content-Type', types[file.split('.').pop()]); res.end(await readFile(new URL(file, import.meta.url))); }
  catch { res.writeHead(500); res.end('Unable to load'); }
}).listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log('Here Radio listening on port ' + (process.env.PORT || 3000)));
