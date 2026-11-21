const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { buildShareUrls } = require('../src/utils/socialShareUrlBuilder');

describe('Social Share URL Builder Tests', () => {
  test('generates valid encoded URLs for all supported platforms', () => {
    const urls = buildShareUrls({
      url: 'https://gopikrishna1536.github.io/portfolio',
      title: 'Check out Gopi Krishna Portfolio',
      via: 'gopi'
    });

    assert.ok(urls.linkedin.includes('https://www.linkedin.com/sharing/share-offsite/?url='));
    assert.ok(urls.twitter.includes('twitter.com/intent/tweet'));
    assert.ok(urls.whatsapp.includes('api.whatsapp.com/send'));
    assert.ok(urls.reddit.includes('reddit.com/submit'));
  });

  test('throws error when URL is missing', () => {
    assert.throws(() => buildShareUrls({}), /Target URL is required/);
  });
});
