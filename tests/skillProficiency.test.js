const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { rankSkills, computeDomainStats } = require('../src/utils/skillProficiencyRanker');

const sampleSkills = [
  { name: 'Node.js', category: 'Backend', proficiency: 92, years: 3 },
  { name: 'Python', category: 'Backend', proficiency: 95, years: 4 },
  { name: 'React', category: 'Frontend', proficiency: 88, years: 3 },
  { name: 'Docker', category: 'DevOps', proficiency: 85, years: 2 }
];

describe('Skill Proficiency Ranker Tests', () => {
  test('ranks skills in descending order of proficiency', () => {
    const ranked = rankSkills(sampleSkills);
    assert.equal(ranked[0].name, 'Python');
    assert.equal(ranked[1].name, 'Node.js');
  });

  test('computes aggregate statistics per domain', () => {
    const stats = computeDomainStats(sampleSkills);
    assert.equal(stats.Backend.count, 2);
    assert.ok(stats.Backend.averageProficiency >= 90);
  });
});
