const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
global.serverPort = 3000;

// Routes
var play = require('./routes/play')
var speech = require('./routes/speech')

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Http request logger
app.use(morgan('dev'));

// API
app.post('/api/playmusic', play.music)
app.post('/api/playtts', play.tts)
app.get('/api/speech', speech.createStream)

// Front-end
app.use(express.static('client/build'));
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(global.serverPort, () => console.log('PiFM_Web started and listening on port ' + global.serverPort))