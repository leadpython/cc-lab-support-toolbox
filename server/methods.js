const path = require('path');

function getDesktopPath() {
  return path.join(require('os').homedir(), 'Desktop');
}

function getLabPath(lab) {
  return `${getDesktopPath()}/jaxx/templates/${lab.toLowerCase()}/coa`;
}

// function getTemplatesPath() {
//   console.log(`${getDesktopPath()}/templates`)
//   return `${getDesktopPath()}/jaxx/templates`;
// }

// function getTestJson() {
//   return fs.readFileSync('./test.json', "utf8");
// }

function getHeaders(session) {
  return {
    'Accept': '*/*',
    'Referer': 'https://internal.confidentcannabis.com/',
    'Origin': 'https://internal.confidentcannabis.com',
    'User-Agent': 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
    'Sec-Fetch-Mode': 'cors',
    'Content-Type': 'application/json',
    'Cookie': session
  }
}

module.exports = { getHeaders, getLabPath };