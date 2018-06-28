const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

var play = require('./routes/play')

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Http request logger
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   const path = require('path');
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.post('/api/playmusic', play.music)
app.post('/api/playtts', function (req, res) {
  res.send('Got a POST request tts\n ' + req.body)
})

app.listen(3001, () => console.log('PiFM_Web started and listening on port 3001!'))