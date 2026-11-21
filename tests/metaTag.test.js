const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { generateMetaTags } = require('../src/utils/metaTagGenerator');

describe('Meta Tag Generator Tests', () => {
  test('creates full suite of OpenGraph, Twitter Cards, and canonical tags', () => {
    const html = generateMetaTags({
      title: 'Gopi Krishna | Full-Stack & AI Engineer',
      description: 'Showcasing scalable cloud systems and deep learning solutions',
      url: 'https://gopikrishna1536.github.io',
      imageUrl: 'https://gopikrishna1536.github.io/assets/banner.png'
    });

    assert.ok(html.includes('<meta property="og:title"'));
    assert.ok(html.includes('summary_large_image'));
    assert.ok(html.includes('<link rel="canonical"'));
  });
});
