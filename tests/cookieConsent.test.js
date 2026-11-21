const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { createConsentRecord, isConsentExpired } = require('../src/utils/cookieConsentManager');

describe('Cookie Consent Manager Tests', () => {
  test('creates compliant consent record with necessary cookies locked to true', () => {
    const record = createConsentRecord({ necessary: false, analytics: true });
    assert.equal(record.consentGiven, true);
    assert.equal(record.preferences.necessary, true);
    assert.equal(record.preferences.analytics, true);
  });

  test('verifies expired consent based on max-age policy', () => {
    const expiredRecord = {
      timestamp: new Date(Date.now() - 400 * 24 * 3600 * 1000).toISOString()
    };
    assert.equal(isConsentExpired(expiredRecord), true);

    const freshRecord = { timestamp: new Date().toISOString() };
    assert.equal(isConsentExpired(freshRecord), false);
  });
});
