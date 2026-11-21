const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { filterProjects, extractUniqueTags } = require('../src/utils/projectTagFilter');

const sampleProjects = [
  { id: 1, title: 'AI Retail Planning', category: 'AI/ML', tags: ['Python', 'FastAPI', 'React'], description: 'Budget optimizer' },
  { id: 2, title: 'Cloud Inventory', category: 'Cloud', tags: ['Node.js', 'PostgreSQL', 'Docker'], description: 'Warehouse logistics' },
  { id: 3, title: 'Smart Market Watch', category: 'Finance', tags: ['Python', 'WebSocket', 'React'], description: 'Trading signals' }
];

describe('Project Tag Filter Tests', () => {
  test('returns all projects when no filters applied', () => {
    const res = filterProjects(sampleProjects);
    assert.equal(res.length, 3);
  });

  test('filters by category', () => {
    const res = filterProjects(sampleProjects, { category: 'AI/ML' });
    assert.equal(res.length, 1);
    assert.equal(res[0].id, 1);
  });

  test('filters by specific technology tag', () => {
    const res = filterProjects(sampleProjects, { tag: 'React' });
    assert.equal(res.length, 2);
  });

  test('extracts sorted unique tags across all projects', () => {
    const tags = extractUniqueTags(sampleProjects);
    assert.ok(tags.includes('Python'));
    assert.ok(tags.includes('Docker'));
    assert.equal(tags.length, 7);
  });
});
