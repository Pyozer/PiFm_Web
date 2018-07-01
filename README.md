# PiFm_Web

Ce projet a pour but d'avoir une interface pour contrôler l'émission FM sur un Raspberry Pi et grâce à l'outil [PiFMRds](https://github.com/ChristopheJacquet/PiFmRds).

Cette interface permettra de pouvoir gérer le nom de la radio et le texte (ex: nom de la chanson) à afficher, la fréquence d'émission mais aussi la source audio.
Que ce soit l'URL d'un flux audio ou encore un texte à envoyer (TTS avec Google).

L'application fonctionne avec un serveur Node.JS pour la partie backend et React pour le front.
Pour start l'application il vous suffit de faire : `node app.js`.
Un serveur sur le port 3000 se lancera.

Voici à quoi ressemble l'interface de contrôle :
![Play music](https://screenshotscdn.firefoxusercontent.com/images/169294f2-07c3-44cc-af7e-7fda92955ba5.png)
![TTS](https://screenshotscdn.firefoxusercontent.com/images/b67f2da4-98a9-40aa-8610-13b6720b6dc3.png)