var shell = require('shelljs');

var music = function(req, res) {
    let data = req.body

    if (!data.streamURL) {
        res.status(400).send({
            status: "error",
            message: "Vous devez spécifiez l'URL du stream audio."
        })
        return;
    }

    if (!isRadioInfoCorrect(data)) {
        res.status(400).send({
            status: "error",
            message: "Vous devez spécifiez le nom, le texte et la fréquence de la radio entre 87.5 et 108.0."
        })
        return;
    }

    shell.cd('/home/pi/PiFmRds/src/');
    
    let freq = parseFloat(data.radioFrequency).toFixed(1)
    const cmd = 'ffmpeg -i ' + data.streamURL + ' -f wav - | sudo ./pi_fm_rds -freq ' + freq + ' -ps "' + data.radioName + '" -rt "' + data.radioText + '" -audio -'

    shell.exec(cmd, function(code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });

    res.status(200).send({
        status: "success",
        message: "Streaming audio successfully send to radio"
    })
}

var tts = function(req, res) {
    if (!req.body.textToSpeech) {
        res.status(400).send({
            status: "error",
            message: "Vous devez spécifiez le texte à parler"
        })
        return;
    }

    let textParamEncoded = require("querystring").stringify({text: req.body.textToSpeech});
    
    req.body.streamURL = "http://localhost:" + global.serverPort + "/api/speech?" + textParamEncoded
    music(req, res)
}

function isRadioInfoCorrect(data) {
    if (data.radioFrequency)
        data.radioFrequency = parseFloat(data.radioFrequency)

    return (
        data.radioName && data.radioName.length > 0 &&
        data.radioText && data.radioText.length > 0 &&
        data.radioFrequency && data.radioFrequency >= 87.5 && data.radioFrequency <= 108.0
    )
}

exports.music = music;
exports.tts = tts;