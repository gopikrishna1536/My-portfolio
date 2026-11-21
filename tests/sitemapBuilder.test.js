const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { buildSitemapXml } = require('../src/utils/sitemapXmlBuilder');

describe('Sitemap XML Builder Tests', () => {
  test('generates valid sitemap XML with custom priorities and change frequencies', () => {
    const sitemap = buildSitemapXml([
      { loc: 'https://gopikrishna1536.github.io/', priority: 1.0, changefreq: 'daily' },
      { loc: 'https://gopikrishna1536.github.io/projects', priority: 0.9, changefreq: 'weekly' }
    ]);

    assert.ok(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
    assert.ok(sitemap.includes('<priority>1.0</priority>'));
    assert.ok(sitemap.includes('<changefreq>daily</changefreq>'));
  });
});
