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
  'Cookie': 'cc_session_0=.eJwlzj1uQzEMA-C7eM5gWT-U3mUCW7aRri_NVPTuNdCFALnw-ynPfa_3q1zf92c9yvNrlqvsqJPQzcNOrGqpVURrAwa3PTiUwLqN0_gUIFo657DZtVN46BAf7t6DRGaHuKlmE1VMpLKk-5g1R2XkCnUyQwTN5URSHuXzXvc_poXDLmU1AVdUqDif2wNC20ZnATcckLBWiBBPnuX3DyLMN-8.EPV-eg.6SZrW0JtwSloXm-S0GOhFKVKytQPHdg3KZeaTK8XOis'
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


