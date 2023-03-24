const router = require('express').Router();
const axios = require('axios');
const { getHeaders } = require('./methods.js');
const multiTestPackageUpdater = require('./multi-tp-updater/index.js');

multiTestPackageUpdater(router);

// LOGIN AND RETURN SESSION COOKIE
router.post('/login-internal', (request, response) => {
  const body = request.body
  const options = { headers: getHeaders('') }
  axios.post('https://api.confidentcannabis.com/login', body, options).then(res => {
    console.log(res.headers['set-cookie'][0].split(';')[0])
    response.json(res.headers['set-cookie'][0].split(';')[0]);
  });
})

module.exports = router;

// var SESSION_COOKIE = 'cc_session_0=.eJwljktKBUEMRffSY5FU5VfpzTT1SVAEle5-I3HvRt4kkFzOzfnZjjj9etv2-3z4y3a8r23fpBshj8AhaNH7YmwcgEI-AbQ2jJZDpixDEBLhVQEWtEwM0Fchjj5G6WIUQIqjW2WPAFm9R_IypzmCxxojgaqmXc2o-ZQtRR6Xn0-bak1lZ2TJHlBQpvyNSMRaQ0peFKsWxZQGJSq4cGXHvM447q8P__xvWW32EsHgBialQCRGyoUqkY8IBRruycV1zJnI5fdz--5924twRZUq-spFxez3DwWRVXM.Yn1CzA.l8qmA-clsSKstyDf2_uGIs-jEGurZb-j2Tm-begYJRI';
// const TEMPLATES_PATH = getTemplatesPath();
// const HEADERS = {
//   'Accept': '*/*',
//   'Referer': 'https://internal.confidentcannabis.com/',
//   'Origin': 'https://internal.confidentcannabis.com',
//   'User-Agent': 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
//   'Sec-Fetch-Mode': 'cors',
//   'Content-Type': 'application/json',
//   'Cookie': SESSION_COOKIE
// };


// router.post('/update-configs', (request, response) => {
//   let labs = request.query.lab || []
//   let session = request.query.session
//   multiTestPackageUpdater.execute(labs, session)
// })

// router.get('/get-lab-internal-config', (request, response) => {
//   try {
//     const lab = request.query.lab;
//     if (!lab) {
//       throw 'Lab not provided!';
//     }
//     _request({
//       url: 'https://api.confidentcannabis.com/support/lookuplab',
//       method: 'POST',
//       headers: HEADERS,
//       body: `{ "query": "${lab}" }`
//     }, (error, res, body) => {
//       if (!error && res.statusCode == 200) {
//         const lab_id = JSON.parse(body).data.lab.id;
//         _request({
//           url: `https://api.confidentcannabis.com/support/lab/${lab_id}/generate_pdf_config`,
//           method: 'POST',
//           headers: HEADERS
//         }, (error, res, body) => {
//           if (!error && res.statusCode == 200) {
//             const internalConfig = JSON.parse(JSON.parse(body).data.config);
//             response.json({ message: 'Lab found!', data: internalConfig, status: 0 });
//           }
//         })
//       }
//     });
//   }
//   catch(error) {
//     response.json({ message: error, status: -1 });
//   }
// });

// function parseCookies (request) {
//   var list = {},
//       rc = request.headers.cookie;

//   rc && rc.split(';').forEach(function( cookie ) {
//       var parts = cookie.split('=');
//       list[parts.shift().trim()] = decodeURI(parts.join('='));
//   });

//   return list;
// }



