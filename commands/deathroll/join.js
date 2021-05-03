const gameState = require('../../gamestate.js');

module.exports = {
    name: 'join',
    aliases: ['j'],
    description: 'joins a started deathroll',

    execute(message, args) {
        if (!gameState.inProgress || gameState.playerList.length === 2) return;

        let playerList = gameState.playerList;

        if (!(playerList.includes(message.member.user.username))) {
            playerList.push(message.member.user.username);
            message.channel.send(`Current players: ${playerList}`);
        } else {
            message.channel.send(`You're already signed up!`)
            message.channel.send(`Current players: ${playerList}`);
        };

        if (playerList.length === 2) {
            message.channel.send(`The deathroll between ${playerList[0]} and ${playerList[1]} will start, either player start the battle by typing "!roll ${gameState.expectedRoll}"`)
        }
    }
}