const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { generateRssFeed, toRfc822Date } = require('../src/utils/rssFeedGenerator');

describe('RSS Feed Generator Tests', () => {
  test('creates valid RSS 2.0 XML structure with items', () => {
    const xml = generateRssFeed({
      title: 'Gopi Krishna Tech Blog',
      description: 'Articles on Full-Stack, AI and Cloud Architecture',
      link: 'https://gopikrishna1536.github.io',
      items: [
        {
          title: 'Building High-Performance Trading Backends',
          link: 'https://gopikrishna1536.github.io/blog/trading-backend',
          description: 'A deep dive into orderbook engines',
          pubDate: '2026-11-20T10:00:00Z',
          guid: 'post-1'
        }
      ]
    });

    assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8" ?>'));
    assert.ok(xml.includes('<rss version="2.0">'));
    assert.ok(xml.includes('Building High-Performance Trading Backends'));
    assert.ok(xml.includes('<guid>post-1</guid>'));
  });
});
