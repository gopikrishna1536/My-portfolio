const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateContactForm } = require('../src/utils/contactFormValidator');

describe('Contact Form Validator Tests', () => {
  test('valid form passes validation and sanitizes fields', () => {
    const res = validateContactForm({
      name: '  Jane Doe  ',
      email: 'Jane.Doe@Example.com ',
      message: 'Hello, I would love to collaborate on a fullstack AI project!'
    });
    assert.equal(res.valid, true);
    assert.equal(res.sanitized.name, 'Jane Doe');
    assert.equal(res.sanitized.email, 'jane.doe@example.com');
  });

  test('honeypot field triggers spam detection', () => {
    const res = validateContactForm({
      name: 'Bot',
      email: 'bot@spam.com',
      message: 'Spam message content here',
      honeypot: 'http://spam.link'
    });
    assert.equal(res.valid, false);
    assert.ok(res.error.includes('Spam detected'));
  });

  test('rejects short messages', () => {
    const res = validateContactForm({
      name: 'Bob',
      email: 'bob@test.com',
      message: 'Too short'
    });
    assert.equal(res.valid, false);
    assert.ok(res.error.includes('at least 10 characters'));
  });

  test('rejects invalid email addresses', () => {
    const res = validateContactForm({
      name: 'Alice',
      email: 'invalid-email@',
      message: 'This is a long enough valid message test'
    });
    assert.equal(res.valid, false);
    assert.ok(res.error.includes('Invalid email'));
  });
});
