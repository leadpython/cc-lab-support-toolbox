const router = require('express').Router();
const fs = require('fs');
const _request = require('request');
const { getTemplatesPath } = require('./methods.js');
const Result = require('./classes/Result.js');

const TEMPLATES_PATH = getTemplatesPath();
const HEADERS = {
  'Accept': '*/*',
  'Referer': 'https://internal.confidentcannabis.com/',
  'Origin': 'https://internal.confidentcannabis.com',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
  'Sec-Fetch-Mode': 'cors',
  'Content-Type': 'application/json',
  'Cookie': 'cc_session_0=.eJwljjtuAzEMBe-iegtR_O9lDImk4LTruDJ89yyQ8g0Gg_dpj33V69nO3-tdR3v8ZDubZO-hmDw3WITByHAaVbHT5nSfgWjdrINXIhgApURyLiIXQZgbadxrdbWxpnTtJl1Ql2WAVLguH3U7Ijw4WQV5VrmzpbSjvV91_Z8ZbionIwsp3h1lMhREItaxBW6iOBQUCbkrEWBitu8fThE50g.EJPpfA.Db-pcJfQdDSYkVc-Hn8itQk80_RZNR8Mnxc8ppDLP88'
};

// GET LAB CONFIG
router.get('/get-lab-config', (request, response) => {
  try {
    const lab = request.query.lab;
    const PATH = `${TEMPLATES_PATH}/${lab}/coa/config.json`;
    // Throw error if lab is not provided
    if (!lab) {
      throw 'Lab not provided!';
    }
    console.log("Hello World!")
    
    // check if PATH is valid/exists
    if (fs.existsSync(PATH)) {
      fs.readFile(PATH, 'utf8', (error, data) => {
        if (error) {
          console.log(error);
          throw 'Something went wrong!';
        }
        response.json(new Result({ data: JSON.parse(data), message: 'Lab found!', status: 0 }));
      });
    } else {
      throw 'Lab not found!';
    }
  }
  catch(error) {
    response.json(new Result({ message: error, status: -1 }));
  }
});

router.get('/get-lab-internal-config', (request, response) => {
  try {
    const lab = request.query.lab;
    if (!lab) {
      throw 'Lab not provided!';
    }
    _request({
      url: 'https://api.confidentcannabis.com/support/lookuplab',
      method: 'POST',
      headers: HEADERS,
      body: `{ "query": "${lab}" }`
    }, (error, res, body) => {
      if (!error && res.statusCode == 200) {
        const lab_id = JSON.parse(body).data.lab.id;
        _request({
          url: `https://api.confidentcannabis.com/support/lab/${lab_id}/generate_pdf_config`,
          method: 'POST',
          headers: HEADERS
        }, (error, res, body) => {
          if (!error && res.statusCode == 200) {
            const internalConfig = JSON.parse(JSON.parse(body).data.config);
            response.json(new Result({ message: 'Lab found!', data: internalConfig, status: 0 }));
          }
        })
      }
    });
  }
  catch(error) {
    response.json(new Result({ message: error, status: -1 }));
  }
});

module.exports = router;


