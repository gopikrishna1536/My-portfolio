/**
 * Social Share URL Builder
 * Generates properly encoded share URLs for LinkedIn, Twitter/X, WhatsApp, and Reddit
 */
function buildShareUrls({ url, title, summary = '', via = 'gopikrishna1536' }) {
  if (!url) throw new Error('Target URL is required');
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || '');
  const encodedSummary = encodeURIComponent(summary || '');
  const encodedVia = encodeURIComponent(via || '');

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${encodedVia}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };
}

module.exports = { buildShareUrls };
