const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { formatCount, getLanguageColor, formatRepoCard } = require('../src/utils/githubRepoStatsFetcher');

describe('GitHub Repo Stats Formatter Tests', () => {
  test('formats number counts with k and M metric abbreviations', () => {
    assert.equal(formatCount(950), '950');
    assert.equal(formatCount(1200), '1.2k');
    assert.equal(formatCount(1000000), '1M');
  });

  test('resolves language colors accurately', () => {
    assert.equal(getLanguageColor('Python'), '#3572A5');
    assert.equal(getLanguageColor('TypeScript'), '#3178c6');
  });

  test('formats complete repo card structure', () => {
    const card = formatRepoCard({
      name: 'signalWatch-smart-market',
      stargazers_count: 1500,
      language: 'Python'
    });
    assert.equal(card.name, 'signalWatch-smart-market');
    assert.equal(card.starsFormatted, '1.5k');
  });
});
