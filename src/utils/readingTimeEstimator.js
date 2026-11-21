/**
 * Article & Documentation Reading Time Estimator
 * Average human silent reading speed: 200 words per minute
 * Code blocks read at 100 words per minute
 */
function estimateReadingTime(content, { wordsPerMinute = 200 } = {}) {
  if (!content || typeof content !== 'string') {
    return { minutes: 0, words: 0, text: '0 min read' };
  }

  // Count code block words separately
  const codeBlockRegex = /```[\s\S]*?```/g;
  let codeWords = 0;
  const cleaned = content.replace(codeBlockRegex, (match) => {
    const words = match.replace(/```/g, '').trim().split(/\s+/).filter(Boolean).length;
    codeWords += words;
    return ' ';
  });

  const proseWords = cleaned.trim().split(/\s+/).filter(Boolean).length;
  const totalWords = proseWords + codeWords;

  // Code takes twice as long to absorb
  const proseMinutes = proseWords / wordsPerMinute;
  const codeMinutes = codeWords / (wordsPerMinute / 2);
  const totalMinutes = Math.max(1, Math.ceil(proseMinutes + codeMinutes));

  return {
    minutes: totalMinutes,
    words: totalWords,
    text: `${totalMinutes} min read`
  };
}

module.exports = { estimateReadingTime };
