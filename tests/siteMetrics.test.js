const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { isSearchBot, calculatePercentile, aggregateMetrics } = require('../src/utils/siteMetricsCounter');

describe('Site Metrics & Bot Filtering Tests', () => {
  test('identifies bot user agents accurately', () => {
    assert.equal(isSearchBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'), true);
    assert.equal(isSearchBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0'), false);
  });

  test('computes p50 and p95 session duration percentiles', () => {
    const durations = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    const sessions = durations.map(d => ({ userAgent: 'Chrome/120', durationMs: d }));
    const agg = aggregateMetrics(sessions);
    assert.equal(agg.validSessions, 10);
    assert.equal(agg.p50Duration, 5000);
    assert.equal(agg.p95Duration, 10000);
  });
});
