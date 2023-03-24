const fs = require('fs');
const axios = require('axios');
const { getHeaders, getLabPath } = require('../methods.js');

module.exports = (router) => {
  router.post('/update-jaxx-configs', (request, response) => {
    const session = request.body.session
    let labs = request.body.labs.toUpperCase().replace(/ /g, '').split(',').sort()
    let options = { headers: getHeaders(session) }
    let diffs = {};

    // grab lab IDs
    let labIdPromises = []
    let labIds = {}
    for (let i = 0; i < labs.length; i++) {
      let lab = labs[i]
      labIdPromises.push(axios.post('https://api.confidentcannabis.com/support/lookuplab', `{ "query": "${lab}" }`, options).then(lookuplab_res => {
        let labId = lookuplab_res.data.data.lab.id
        labIds[lab.toLowerCase()] = labId
      }))
    }
    Promise.all(labIdPromises).then(() => {
      console.log('\n')
      // grab configs
      let generateConfigPromises = []
      let diffs = {}
      for (let lab in labIds) {
        let labId = labIds[lab]
        if (fs.existsSync(`${getLabPath(lab)}/config.json`)) {
          generateConfigPromises.push(axios.post(`https://api.confidentcannabis.com/support/lab/${labId}/generate_pdf_config`, '', options).then(generate_pdf_config_res => {
            let newConfig = JSON.parse(generate_pdf_config_res.data.data.config)
            let oldConfig = grabOldConfig(lab.toLowerCase())
            let result = combineConfigs(oldConfig, newConfig)
            let combinedConfig = makeTpComply(result.config)
            overwriteConfig(lab, combinedConfig)
            diffs[lab.toLowerCase()] = result.diff
          }))
        }
      }
      Promise.all(generateConfigPromises).then(() => {
        console.log(diffs)
        response.json(diffs)
      })
    });
  })
}

function grabOldConfig(lab) {
  let config = JSON.parse(fs.readFileSync(`${getLabPath(lab)}/config.json`));
  return config;
}

function combineConfigs(oldTp, newTp) {
  let combinedTp = JSON.parse(JSON.stringify(oldTp));
  let diff = {};
  for (let id in newTp.packages) {
    if (!diff[id]) {
      diff[id] = {};
    }
    if (!oldTp.packages[id]) {
      // if it does not exist in the old config yet, then it is new
      diff[id].new = true;
      combinedTp.packages[id] = newTp.packages[id];
    } else {
      let pages = combinedTp.packages[id].pages;
      combinedTp.packages[id] = newTp.packages[id];
      combinedTp.packages[id].pages = pages;
    }
    if (!diff[id].new) {
      diff[id].diff = diffTestTypes(oldTp.packages[id].test_types, newTp.packages[id].test_types)
    }
  }
  return { diff, config: combinedTp };
}

function overwriteConfig(lab, config) {
  fs.writeFileSync(`${getLabPath(lab)}/config.json`, JSON.stringify(config, null, 2))
}

function diffTestTypes(oldTypes, newTypes) {
  let diff = {
    removed: [],
    added: []
  };
  
  if (newTypes) {
    // look for any new ones
    for (let i = 0; i < newTypes.length; i++) {
      let type = newTypes[i];
      if (oldTypes && !oldTypes.includes(type)) {
        diff.added.push(type)
      }
    }
  }
  
  if (oldTypes) {
    // for any old ones
    for (let i = 0; i < oldTypes.length; i++) {
      let type = oldTypes[i];
      if (newTypes && !newTypes.includes(type)) {
        diff.removed.push(type)
      }
    }
  }
  return diff;
}

function makeTpComply(config) {
  for (let id in config.packages) {
    let tps = config.packages[id];
    let compliance = tps.compliance;
    if (typeof tps.pages !== 'string') {
      for (let i = 0; i < tps.pages.length; i++) {
        let page = tps.pages[i];
        if (compliance) {
          if (!(typeof page === 'string')) {
            config.packages[id].pages[i].options.regulatory_type = '';
          }
        } else {
          if (!(typeof page === 'string')) {
            config.packages[id].pages[i].options.regulatory_type = 'non-regulatory';
          } else {
            config.packages[id].pages[i] = {
              page,
              options: {
                regulatory_type: 'non-regulatory'
              }
            };
          }
        }
      }
    }
  }
  return config;
}


// function pageMapper() {
//   for (let lab in configs) {
//     let config = grabOldConfig(lab);
//     let pageMap = pageMaps[lab];
//     for (let id in config.packages) {
//       let tp = config.packages[id];
//       let pages = tp.pages;
//       let tests = tp.test_types;
//       if (pages && typeof pages === 'object') {
//         if (pages.length === 0) {
//           config.packages[id].pages = mapPages(pageMap, tests);
//         }
//       }
//     }
//     overwriteConfig(lab, config);
//   }
// }

// function mapPages(map, tests) {
//   let pages = [];
//   for (let i = 0; i < tests.length; i++) {
//     let test = tests[i].toLowerCase().replace('-r', '').replace('-a', '');
//     for (let page in map) {
//       if (map[page].includes(test)) {
//         pages.push(page)
//       }
//     }
//   }
//   return pages;
// }