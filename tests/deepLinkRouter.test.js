const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { HashRouter } = require('../src/utils/deepLinkRouter');

describe('Hash Deep Link Router Tests', () => {
  test('routes to registered handler and parses query parameters', () => {
    const router = new HashRouter();
    router.addRoute('projects', ({ path, params }) => ({
      component: 'ProjectsView',
      tag: params.get('tag')
    }));

    const res = router.resolve('#/projects?tag=react');
    assert.equal(res.component, 'ProjectsView');
    assert.equal(res.tag, 'react');
  });

  test('falls back to not-found handler for unknown paths', () => {
    const router = new HashRouter();
    router.setNotFound(({ path }) => ({ component: 'NotFoundView', missingPath: path }));

    const res = router.resolve('#/unknown-route');
    assert.equal(res.component, 'NotFoundView');
    assert.equal(res.missingPath, 'unknown-route');
  });
});
