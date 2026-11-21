/**
 * Responsive Image and WebP Fallback srcset Generator
 */
function generateSrcSet(basePath, widths = [320, 640, 1024, 1920]) {
  if (!basePath) return '';
  const extIndex = basePath.lastIndexOf('.');
  const name = extIndex !== -1 ? basePath.slice(0, extIndex) : basePath;
  const ext = extIndex !== -1 ? basePath.slice(extIndex) : '.jpg';

  return widths
    .map(w => `${name}-${w}w${ext} ${w}w`)
    .join(', ');
}

function generatePictureHtml({ src, alt, widths, sizes = '100vw' }) {
  const extIndex = src.lastIndexOf('.');
  const name = extIndex !== -1 ? src.slice(0, extIndex) : src;
  const webpSrcSet = generateSrcSet(`${name}.webp`, widths);
  const origSrcSet = generateSrcSet(src, widths);

  return `<picture>
  <source type="image/webp" srcset="${webpSrcSet}" sizes="${sizes}">
  <img src="${src}" srcset="${origSrcSet}" sizes="${sizes}" alt="${alt || ''}" loading="lazy" decoding="async">
</picture>`;
}

module.exports = { generateSrcSet, generatePictureHtml };
