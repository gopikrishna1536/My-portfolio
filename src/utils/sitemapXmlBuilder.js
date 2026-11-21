/**
 * Sitemap XML Builder
 * Generates XML sitemap conforming to sitemaps.org protocol 0.9
 */
function buildSitemapXml(urls) {
  if (!Array.isArray(urls)) urls = [];
  const entries = urls.map(u => {
    const loc = u.loc;
    const lastmod = u.lastmod || new Date().toISOString().split('T')[0];
    const changefreq = u.changefreq || 'weekly';
    const priority = u.priority !== undefined ? Number(u.priority).toFixed(1) : '0.8';

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

module.exports = { buildSitemapXml };
