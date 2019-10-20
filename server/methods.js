const path = require('path');

function getDesktopPath() {
  return path.join(require('os').homedir(), 'Desktop');
}

function getTemplatesPath() {
  console.log(`${getDesktopPath()}/templates`)
  return `${getDesktopPath()}/jaxx/templates`;
}

function getTestJson() {
  return fs.readFileSync('./test.json', "utf8");
}

module.exports = { getDesktopPath, getTemplatesPath };