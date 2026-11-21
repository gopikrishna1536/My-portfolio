/**
 * Skill Proficiency and Domain Mastery Ranker
 */
function rankSkills(skills, { category = null, sortBy = 'proficiency' } = {}) {
  if (!Array.isArray(skills)) return [];
  let filtered = skills;
  if (category) {
    filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  return [...filtered].sort((a, b) => {
    if (sortBy === 'proficiency') {
      return (b.proficiency || 0) - (a.proficiency || 0);
    }
    if (sortBy === 'years') {
      return (b.years || 0) - (a.years || 0);
    }
    return a.name.localeCompare(b.name);
  });
}

function computeDomainStats(skills) {
  if (!Array.isArray(skills)) return {};
  const stats = {};
  skills.forEach(s => {
    const cat = s.category || 'General';
    if (!stats[cat]) stats[cat] = { count: 0, totalProficiency: 0 };
    stats[cat].count += 1;
    stats[cat].totalProficiency += (s.proficiency || 0);
  });

  Object.keys(stats).forEach(cat => {
    stats[cat].averageProficiency = Math.round(stats[cat].totalProficiency / stats[cat].count);
  });
  return stats;
}

module.exports = { rankSkills, computeDomainStats };
