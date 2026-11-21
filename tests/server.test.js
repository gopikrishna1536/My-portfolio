const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createPortfolioServer, MIME_TYPES } = require('../server');

describe('Portfolio Static Server & Security Tests', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createPortfolioServer();
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('should serve index.html with text/html content type on root request', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('text/html'));
    const body = await res.text();
    assert.ok(body.includes('Gopi Krishna'));
  });

  test('should return 404 for non-existent files', async () => {
    const res = await fetch(`${baseUrl}/does-not-exist.html`);
    assert.equal(res.status, 404);
  });

  test('should maintain comprehensive MIME types mapping', () => {
    assert.equal(MIME_TYPES['.html'], 'text/html');
    assert.equal(MIME_TYPES['.css'], 'text/css');
    assert.equal(MIME_TYPES['.js'], 'text/javascript');
    assert.equal(MIME_TYPES['.png'], 'image/png');
    assert.equal(MIME_TYPES['.svg'], 'image/svg+xml');
  });
});
