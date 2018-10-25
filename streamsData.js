const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

let streamsData = []

let my_middleware_function = function(req, res, next) {
  const URL = 'https://wind-bow.glitch.me/twitch-api/'
  const CHANNELS = ['tsm_myth', 'FreeCodeCamp', 'shroud', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
  streamsData = []

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
}

router.get('/', (req, res) => {
    res.json(streamsData);
})

//Running the script to call the Twich api and store the response.
router.get('/script', (req, res) => {
    my_middleware_function();
    res.end();
})

module.exports = router;