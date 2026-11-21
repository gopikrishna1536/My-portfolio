/**
 * Site Metrics and Client Performance Counter
 * Tracks page views, duration percentiles, and filters synthetic bot user agents
 */
const KNOWN_BOTS = ['bot', 'crawl', 'spider', 'slurp', 'mediapartners', 'lighthouse', 'headless'];

function isSearchBot(userAgent) {
  if (!userAgent || typeof userAgent !== 'string') return false;
  const ua = userAgent.toLowerCase();
  return KNOWN_BOTS.some(bot => ua.includes(bot));
}

function calculatePercentile(values, percentile) {
  if (!Array.isArray(values) || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

function aggregateMetrics(sessions) {
  if (!Array.isArray(sessions)) return { validSessions: 0, p50Duration: 0, p95Duration: 0 };
  const humanSessions = sessions.filter(s => !isSearchBot(s.userAgent));
  const durations = humanSessions.map(s => Number(s.durationMs) || 0);

  return {
    validSessions: humanSessions.length,
    p50Duration: calculatePercentile(durations, 50),
    p95Duration: calculatePercentile(durations, 95)
  };
}

module.exports = { isSearchBot, calculatePercentile, aggregateMetrics };
