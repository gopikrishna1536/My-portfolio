/**
 * Contact Form Validator
 * RFC 5322 compliant email regex, length checks, honeypot spam filter
 */
function validateContactForm({ name, email, message, honeypot = '' }) {
  if (honeypot && honeypot.trim() !== '') {
    return { valid: false, error: 'Spam detected via honeypot' };
  }
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters long' };
  }
  if (name.trim().length > 100) {
    return { valid: false, error: 'Name cannot exceed 100 characters' };
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return { valid: false, error: 'Invalid email address format' };
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters long' };
  }
  if (message.trim().length > 5000) {
    return { valid: false, error: 'Message exceeds maximum length of 5000 characters' };
  }
  return {
    valid: true,
    sanitized: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    }
  };
}

module.exports = { validateContactForm };
