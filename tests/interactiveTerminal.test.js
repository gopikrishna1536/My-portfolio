const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { executeTerminalCommand } = require('../src/utils/interactiveTerminalCommands');

describe('Interactive Terminal CLI Emulator Tests', () => {
  test('executes help command listing supported actions', () => {
    const res = executeTerminalCommand('help');
    assert.ok(res.output.includes('whoami'));
    assert.ok(res.output.includes('skills'));
  });

  test('resolves whoami and skills commands', () => {
    const whoami = executeTerminalCommand('whoami');
    assert.ok(whoami.output.includes('Full-Stack Engineer'));
    const skills = executeTerminalCommand('skills');
    assert.ok(skills.output.includes('Python'));
  });

  test('returns error for unknown command', () => {
    const res = executeTerminalCommand('invalid_command_xyz');
    assert.ok(res.error.includes('Command not found'));
  });
});
