const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { calculateContrastRatio, checkWcagCompliance } = require('../src/utils/colorPaletteGenerator');

describe('Color Palette & WCAG Accessibility Tests', () => {
  test('black on white yields maximum 21:1 contrast ratio', () => {
    const ratio = calculateContrastRatio('#000000', '#ffffff');
    assert.equal(ratio, 21);
    const wcag = checkWcagCompliance(ratio);
    assert.equal(wcag.passesAA, true);
    assert.equal(wcag.passesAAA, true);
  });

  test('identical colors yield 1:1 contrast ratio and fail AA', () => {
    const ratio = calculateContrastRatio('#ffffff', '#ffffff');
    assert.equal(ratio, 1);
    const wcag = checkWcagCompliance(ratio);
    assert.equal(wcag.passesAA, false);
  });

  test('portfolio dark mode brand palette meets WCAG AA standards', () => {
    const ratio = calculateContrastRatio('#0f172a', '#38bdf8');
    assert.ok(ratio >= 4.5);
    const wcag = checkWcagCompliance(ratio);
    assert.equal(wcag.passesAA, true);
  });
});
