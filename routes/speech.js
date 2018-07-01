var gtts = require('node-gtts')('fr');

exports.createStream = function(req, res) {
    if (!req.query.text) {
        res.status(400).send({
            status: "error",
            message: "Vous devez spécifiez le texte à parler"
        })
        return;
    }

    res.set({'Content-Type': 'audio/mpeg'});
    gtts.stream(req.query.text).pipe(res);
}