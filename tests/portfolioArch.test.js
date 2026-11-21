const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('Portfolio Architecture Documentation Tests', () => {
  test('confirms architecture specification exists and covers system components', () => {
    const docPath = path.join(__dirname, '..', 'docs', 'PORTFOLIO_ARCHITECTURE.md');
    assert.ok(fs.existsSync(docPath));
    const content = fs.readFileSync(docPath, 'utf8');
    assert.ok(content.includes('Portfolio Architecture & Engineering System Design'));
    assert.ok(content.includes('node:test'));
  });
});
