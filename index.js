const express = require('express');
const app = express();
const fetch = require('node-fetch');

const wiki = require('./wiki.js')

let streamsData = []

let my_middleware_function = function(req, res, next) {
  const URL = 'https://wind-bow.glitch.me/twitch-api/'
  const CHANNELS = ['tsm_myth', 'FreeCodeCamp', 'shroud', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']

  for (let i = 0; i < CHANNELS.length; i++ ) {
    fetch(URL + 'streams/' + CHANNELS[i])
      .then(response => response.json())
      .then(response => {
        console.log('Request successful'); 
        if (response.stream !== null) {
          streamsData.push(response);
        } else {
          fetch(URL + 'users/' + CHANNELS[i])
            .then(response => response.json())
            .then(response => {
              streamsData.push(response)
            })    
            .catch(error => console.log('Request failed', error));
        }
      })
      .catch(error => console.log('Request failed', error));
  }
  next();
}

let show_results = function(req, res, next) {
 res.send(streamsData);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/secret', function(req, res, next) {
  console.log('TEST Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.use('/wiki', wiki);
app.use('/script', my_middleware_function);
app.use('/showresults', show_results);

app.listen(3000, () => { console.log('Example listening on port 3000');});