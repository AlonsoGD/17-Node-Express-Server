const express = require('express');
const app = express();

const streamsData = require('./streamsData.js')


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/secret', function(req, res, next) {
  console.log('TEST Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.use('/weather', express.static('public'));
app.use('/showresults', streamsData);

app.listen(3000, () => { console.log('Example listening on port 3000');});