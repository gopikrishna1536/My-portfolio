/**
 * WCAG 2.1 Contrast Ratio and Theme Accessibility Utility
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 */
function hexToRgb(hex) {
  let c = hex.replace(/^#/, '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function getRelativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hexToRgb(hex1));
  const lum2 = getRelativeLuminance(hexToRgb(hex2));
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  const ratio = (l1 + 0.05) / (l2 + 0.05);
  return Number(ratio.toFixed(2));
}

function checkWcagCompliance(ratio, size = 'normal') {
  const aaThreshold = size === 'large' ? 3.0 : 4.5;
  const aaaThreshold = size === 'large' ? 4.5 : 7.0;
  return {
    ratio,
    passesAA: ratio >= aaThreshold,
    passesAAA: ratio >= aaaThreshold
  };
}

module.exports = { hexToRgb, getRelativeLuminance, calculateContrastRatio, checkWcagCompliance };
