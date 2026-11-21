/**
 * GitHub Repository Metrics Formatter
 * Formats stars, forks, and language colors for showcase portfolio cards
 */
const LANGUAGE_COLORS = {
  javascript: '#f1e05a',
  typescript: '#3178c6',
  python: '#3572A5',
  html: '#e34c26',
  css: '#563d7c',
  dockerfile: '#384d54'
};

function formatCount(num) {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(num);
}

function getLanguageColor(language) {
  if (!language) return '#8b949e';
  const key = language.toLowerCase();
  return LANGUAGE_COLORS[key] || '#8b949e';
}

function formatRepoCard(repo) {
  return {
    name: repo.name || 'Untitled',
    description: repo.description || 'No description provided',
    starsFormatted: formatCount(repo.stargazers_count || 0),
    forksFormatted: formatCount(repo.forks_count || 0),
    language: repo.language || 'Plain Text',
    languageColor: getLanguageColor(repo.language)
  };
}

module.exports = { formatCount, getLanguageColor, formatRepoCard };
