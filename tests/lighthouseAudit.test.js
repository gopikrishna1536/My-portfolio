const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { auditPerformanceBudget } = require('../src/utils/lighthouseAuditAuditor');

describe('Performance Budget Auditor Tests', () => {
  test('passes audit when asset sizes are within budget limits', () => {
    const assets = [
      { name: 'app.js', bytes: 100 * 1024 },
      { name: 'style.css', bytes: 20 * 1024 },
      { name: 'logo.svg', bytes: 10 * 1024 }
    ];
    const res = auditPerformanceBudget(assets);
    assert.equal(res.passed, true);
    assert.equal(res.violations.length, 0);
  });

  test('flags violations when JS bundle size exceeds threshold', () => {
    const assets = [
      { name: 'huge-bundle.js', bytes: 300 * 1024 }
    ];
    const res = auditPerformanceBudget(assets);
    assert.equal(res.passed, false);
    assert.ok(res.violations[0].includes('JavaScript bundle exceeds budget'));
  });
});
