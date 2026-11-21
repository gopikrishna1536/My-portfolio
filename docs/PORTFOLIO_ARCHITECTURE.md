# Portfolio Architecture & Engineering System Design

## 1. System Overview
The personal developer portfolio is designed as a high-performance, accessible, and lightweight static showcase deployed with zero runtime bloat.

## 2. Directory Hierarchy
- `src/utils/contactFormValidator.js`: Honeypot-shielded contact form validator.
- `src/utils/projectTagFilter.js`: Multi-tag taxonomy search.
- `src/utils/readingTimeEstimator.js`: Weighted code/prose reading time calculator.
- `src/utils/colorPaletteGenerator.js`: WCAG 2.1 AA/AAA compliance contrast audit.
- `src/utils/socialShareUrlBuilder.js`: Multi-platform intent URL generator.
- `src/utils/siteMetricsCounter.js`: Bot-filtered user session metrics.
- `src/utils/rssFeedGenerator.js`: RFC 822 compliant RSS feed.
- `src/utils/sitemapXmlBuilder.js`: Search engine XML sitemap.
- `src/utils/metaTagGenerator.js`: OpenGraph and Twitter card compiler.
- `src/utils/skillProficiencyRanker.js`: Skill taxonomy and mastery aggregator.
- `src/utils/lighthouseAuditAuditor.js`: Asset size performance budget gate.
- `src/utils/githubRepoStatsFetcher.js`: GitHub metric formatter.
- `src/utils/codeSnippetHighlighter.js`: Syntax highlighting engine.
- `src/utils/markdownToHtmlSanitizer.js`: Sanitized markdown parser.
- `src/utils/interactiveTerminalCommands.js`: Interactive browser CLI emulator.
- `src/utils/resumeExperienceCalculator.js`: Career timeline interval merger.
- `src/utils/lazyImageLoader.js`: WebP responsive image pipeline.
- `src/utils/cookieConsentManager.js`: GDPR/CCPA consent engine.
- `src/utils/deepLinkRouter.js`: SPA deep link hash router.

## 3. Automated Verification
All modules are verified using native `node:test` test suites:
```bash
node --test tests/*.test.js
```
