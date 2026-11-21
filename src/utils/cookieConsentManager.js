/**
 * Privacy and Cookie Consent State Manager
 * GDPR & CCPA compliant localStorage consent model
 */
const DEFAULT_PREFERENCES = {
  necessary: true,
  analytics: false,
  preferences: false
};

function createConsentRecord(userChoices = {}) {
  return {
    consentGiven: true,
    timestamp: new Date().toISOString(),
    preferences: {
      ...DEFAULT_PREFERENCES,
      ...userChoices,
      necessary: true // strictly necessary cannot be opted out
    }
  };
}

function isConsentExpired(record, maxAgeDays = 365) {
  if (!record || !record.timestamp) return true;
  const ageMs = Date.now() - new Date(record.timestamp).getTime();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  return ageMs > maxAgeMs;
}

module.exports = { createConsentRecord, isConsentExpired, DEFAULT_PREFERENCES };
