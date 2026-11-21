const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { estimateReadingTime } = require('../src/utils/readingTimeEstimator');

describe('Reading Time Estimator Tests', () => {
  test('returns 0 for empty content', () => {
    const res = estimateReadingTime('');
    assert.equal(res.minutes, 0);
    assert.equal(res.words, 0);
  });

  test('estimates standard prose accurately', () => {
    const text = new Array(400).fill('word').join(' ');
    const res = estimateReadingTime(text);
    assert.equal(res.minutes, 2);
    assert.equal(res.words, 400);
    assert.equal(res.text, '2 min read');
  });

  test('weighs code blocks with higher cognitive reading time', () => {
    const prose = new Array(100).fill('word').join(' ');
    const code = '```javascript\n' + new Array(100).fill('const x = 1;').join(' ') + '\n```';
    const res = estimateReadingTime(prose + '\n' + code);
    assert.ok(res.minutes >= 2);
  });
});
