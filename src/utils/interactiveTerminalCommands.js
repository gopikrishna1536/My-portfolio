/**
 * Interactive Developer Portfolio CLI Emulator
 * Emulates terminal commands: help, skills, projects, contact, clear, whoami
 */
const COMMAND_RESPONSES = {
  whoami: 'gopikrishna1536 - Full-Stack Engineer & AI/Cloud Developer',
  skills: 'Python, TypeScript, Node.js, FastAPI, React, Docker, Kubernetes, AWS',
  projects: '1. signalWatch (Algo Trading)\n2. Cloud Inventory (Logistics)\n3. AI Retail (Finance)',
  contact: 'Email: gopikrishna7223@gmail.com | GitHub: https://github.com/gopikrishna1536'
};

function executeTerminalCommand(input) {
  if (!input || typeof input !== 'string') return '';
  const cmd = input.trim().toLowerCase();
  if (cmd === 'clear') return { action: 'clear' };
  if (cmd === 'help') {
    return {
      output: 'Available commands: whoami, skills, projects, contact, clear, date'
    };
  }
  if (cmd === 'date') {
    return { output: new Date().toUTCString() };
  }
  if (COMMAND_RESPONSES[cmd]) {
    return { output: COMMAND_RESPONSES[cmd] };
  }
  return { error: `Command not found: "${cmd}". Type 'help' for available commands.` };
}

module.exports = { executeTerminalCommand, COMMAND_RESPONSES };
