const apiai = require('apiai');
const app = apiai('0483ad2efa304ac2bcd83f8eaaf190dd');

const getResponse = (query) => {

  const request = app.textRequest(query, {sessionId: 'anid' });

  const responseFromAPI = new Promise((resolve,reject) => {

    request.on('error', err => console.log(err));

    request.on('response', response => resolve(response.result.fulfillment.speech));

    request.end();

  })

  return responseFromAPI;
}

module.exports = {getResponse}
