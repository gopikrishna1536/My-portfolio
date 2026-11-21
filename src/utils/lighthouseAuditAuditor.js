/**
 * Performance Budget & Asset Size Auditor
 */
const DEFAULT_BUDGETS = {
  jsMaxKb: 200,
  cssMaxKb: 50,
  imageMaxKb: 500,
  totalMaxKb: 1000
};

function auditPerformanceBudget(assets, budgets = DEFAULT_BUDGETS) {
  const current = { jsKb: 0, cssKb: 0, imageKb: 0, totalKb: 0 };
  const violations = [];

  assets.forEach(asset => {
    const sizeKb = (asset.bytes || 0) / 1024;
    current.totalKb += sizeKb;
    const ext = asset.name.split('.').pop().toLowerCase();
    if (ext === 'js') current.jsKb += sizeKb;
    else if (ext === 'css') current.cssKb += sizeKb;
    else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) current.imageKb += sizeKb;
  });

  if (current.jsKb > budgets.jsMaxKb) {
    violations.push(`JavaScript bundle exceeds budget: ${current.jsKb.toFixed(1)}KB > ${budgets.jsMaxKb}KB`);
  }
  if (current.cssKb > budgets.cssMaxKb) {
    violations.push(`CSS bundle exceeds budget: ${current.cssKb.toFixed(1)}KB > ${budgets.cssMaxKb}KB`);
  }
  if (current.totalKb > budgets.totalMaxKb) {
    violations.push(`Total page size exceeds budget: ${current.totalKb.toFixed(1)}KB > ${budgets.totalMaxKb}KB`);
  }

  return {
    passed: violations.length === 0,
    current,
    budgets,
    violations
  };
}

module.exports = { auditPerformanceBudget, DEFAULT_BUDGETS };
