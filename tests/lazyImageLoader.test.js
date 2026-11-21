const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { generateSrcSet, generatePictureHtml } = require('../src/utils/lazyImageLoader');

describe('Lazy Image Loader Tests', () => {
  test('generates responsive srcset across viewport width breakpoints', () => {
    const srcset = generateSrcSet('/assets/projects/signal.png', [400, 800]);
    assert.equal(srcset, '/assets/projects/signal-400w.png 400w, /assets/projects/signal-800w.png 800w');
  });

  test('creates picture tag with WebP source and fallback img', () => {
    const html = generatePictureHtml({ src: '/banner.jpg', alt: 'Hero Banner' });
    assert.ok(html.includes('type="image/webp"'));
    assert.ok(html.includes('loading="lazy"'));
    assert.ok(html.includes('decoding="async"'));
  });
});
