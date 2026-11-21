const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calculateCareerDuration } = require('../src/utils/resumeExperienceCalculator');

describe('Resume Experience Calculator Tests', () => {
  test('calculates duration for a single role', () => {
    const roles = [{ startDate: '2023-01-01', endDate: '2024-01-01' }];
    const res = calculateCareerDuration(roles);
    assert.equal(res.years, 1);
  });

  test('merges overlapping career timelines without double-counting', () => {
    const roles = [
      { startDate: '2023-01-01', endDate: '2023-08-01' },
      { startDate: '2023-06-01', endDate: '2024-01-01' }
    ];
    const res = calculateCareerDuration(roles);
    assert.equal(res.years, 1);
  });
});
