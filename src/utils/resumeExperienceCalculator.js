/**
 * Resume Experience Duration Calculator
 * Computes non-overlapping total career duration across timeline entries
 */
function calculateCareerDuration(roles) {
  if (!Array.isArray(roles) || roles.length === 0) return { totalMonths: 0, formatted: '0 yrs' };

  let intervals = roles.map(r => {
    const start = new Date(r.startDate).getTime();
    const end = r.endDate ? new Date(r.endDate).getTime() : Date.now();
    return [Math.min(start, end), Math.max(start, end)];
  });

  // Sort by start date
  intervals.sort((a, b) => a[0] - b[0]);

  // Merge overlapping intervals
  const merged = [];
  intervals.forEach(cur => {
    if (merged.length === 0) {
      merged.push(cur);
    } else {
      const prev = merged[merged.length - 1];
      if (cur[0] <= prev[1]) {
        prev[1] = Math.max(prev[1], cur[1]);
      } else {
        merged.push(cur);
      }
    }
  });

  const totalMs = merged.reduce((sum, [s, e]) => sum + (e - s), 0);
  const totalMonths = Math.round(totalMs / (1000 * 60 * 60 * 24 * 30.44));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let formatted = '';
  if (years > 0) formatted += `${years} yr${years > 1 ? 's' : ''}`;
  if (months > 0) formatted += (years > 0 ? ' ' : '') + `${months} mo${months > 1 ? 's' : ''}`;
  if (!formatted) formatted = '1 mo';

  return { totalMonths, years, months, formatted };
}

module.exports = { calculateCareerDuration };
