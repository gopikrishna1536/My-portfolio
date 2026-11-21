const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { parseMarkdown } = require('../src/utils/markdownToHtmlSanitizer');

describe('Markdown Parser & Sanitizer Tests', () => {
  test('parses markdown headings, bold, and code', () => {
    const input = '# Welcome\n**Software Engineer** at `Google`';
    const output = parseMarkdown(input);
    assert.ok(output.includes('<h1>Welcome</h1>'));
    assert.ok(output.includes('<strong>Software Engineer</strong>'));
    assert.ok(output.includes('<code>Google</code>'));
  });

  test('secures parsed links with rel="noopener noreferrer"', () => {
    const input = '[GitHub](https://github.com/gopikrishna1536)';
    const output = parseMarkdown(input);
    assert.ok(output.includes('rel="noopener noreferrer"'));
    assert.ok(output.includes('target="_blank"'));
  });
});
