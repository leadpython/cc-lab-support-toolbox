const router = require('express').Router();
const fs = require('fs');
const { getTemplatesPath, getTestJson } = require('./methods.js');
const Result = require('./classes/Result.js');

const TEMPLATES_PATH = getTemplatesPath();

// GET LAB CONFIG
router.get('/get-lab-config', (request, response) => {
  try {
    const lab = request.query.lab;
    const PATH = `${TEMPLATES_PATH}/${lab}/coa/config.json`;
    // Throw error if lab is not provided
    if (!lab) {
      throw 'Lab not provided!';
    }
    
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

router.get('/get-test-config', (request, response) => {
  response.json(getTestJson());
});

module.exports = router;