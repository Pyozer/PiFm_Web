var shell = require('shelljs');

exports.music = function(req, res) {
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

    /*let soxCmd = "sox "
    if (data.audioType == "mp3")
        soxCmd += "-t mp3 " + data.streamURL + " -t wav -"
    else if (data.audioType == "wav")
        soxCmd += data.streamURL + " -"*/

    
    const cmd = 'ffmpeg -i ' + data.streamURL + ' -f wav - | sudo ./pi_fm_rds -freq ' + parseFloat(data.radioFrequency).toFixed(1) + ' -audio - &'

    /*var child = shell.exec(cmd, { async: true });
    child.stdout.on('data', function(data) {
        console.log(data)
    });*/
    shell.exec(cmd, function(code, stdout, stderr) {
        console.log('Exit code:', code);
        //console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });

    res.status(200).send({
        status: "success",
        message: "Streaming audio successfully send to radio"
    })
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