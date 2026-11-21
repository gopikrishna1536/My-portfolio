/**
 * RSS 2.0 Feed Generator
 * Generates XML feed with CDATA tags and RFC 822 publication dates
 */
function toRfc822Date(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toUTCString();
}

function generateRssFeed({ title, description, link, items = [] }) {
  const channelItems = items.map(item => `    <item>
      <title><![CDATA[${item.title || ''}]]></title>
      <link>${item.link || ''}</link>
      <description><![CDATA[${item.description || ''}]]></description>
      <pubDate>${toRfc822Date(item.pubDate || new Date())}</pubDate>
      <guid>${item.guid || item.link || ''}</guid>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${title}]]></title>
    <link>${link}</link>
    <description><![CDATA[${description}]]></description>
    <lastBuildDate>${toRfc822Date(new Date())}</lastBuildDate>
${channelItems}
  </channel>
</rss>`;
}

module.exports = { toRfc822Date, generateRssFeed };
