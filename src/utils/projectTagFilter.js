/**
 * Project Tag and Search Filter
 * Filters developer portfolio projects by category, tech stack tags, and fuzzy title search
 */
function filterProjects(projects, { category = 'All', tag = null, query = '' } = {}) {
  if (!Array.isArray(projects)) return [];
  const q = query.trim().toLowerCase();

  return projects.filter(project => {
    if (category !== 'All' && project.category !== category) {
      return false;
    }
    if (tag && (!Array.isArray(project.tags) || !project.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()))) {
      return false;
    }
    if (q) {
      const matchTitle = project.title && project.title.toLowerCase().includes(q);
      const matchDesc = project.description && project.description.toLowerCase().includes(q);
      const matchTag = Array.isArray(project.tags) && project.tags.some(t => t.toLowerCase()).includes(q);
      if (!matchTitle && !matchDesc && !matchTag) return false;
    }
    return true;
  });
}

function extractUniqueTags(projects) {
  if (!Array.isArray(projects)) return [];
  const set = new Set();
  projects.forEach(p => {
    if (Array.isArray(p.tags)) {
      p.tags.forEach(t => set.add(t));
    }
  });
  return Array.from(set).sort();
}

module.exports = { filterProjects, extractUniqueTags };
