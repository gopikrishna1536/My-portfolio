/**
 * SEO & Social OpenGraph Meta Tag Generator
 */
function generateMetaTags({ title, description, url, imageUrl, twitterHandle = '@gopi' }) {
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image" content="${imageUrl}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:creator" content="${twitterHandle}">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${imageUrl}">`
  ];
  return tags.join('\n');
}

module.exports = { generateMetaTags };
