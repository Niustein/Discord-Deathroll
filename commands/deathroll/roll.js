const gameState = require('../../gamestate.js');

module.exports = {
    name: 'roll',
    aliases: ['r'],
    description: 'rolls in the deathroll',

    execute(message, args) {
        if (!gameState.inProgress
            || !gameState.playerList.includes(message.member.user.username)
            || gameState.playerList.length != 2) return;


        if (args[0] != gameState.expectedRoll) {
            message.channel.send(`Please roll the correct number, ${gameState.expectedRoll}`)
            return
        } else if (gameState.lastRoller === message.member.user.username) {
            message.channel.send('Please wait your turn!');
            return
        }

        gameState.rolledValue = parseInt(Math.random() * gameState.expectedRoll + 1);

        if (gameState.rolledValue != 1) {
            message.channel.send(`Roll #${gameState.rollCount}.\n${message.member.user.username} has rolled a ${gameState.rolledValue}.\nNext player please roll ${gameState.rolledValue}`);
            gameState.expectedRoll = gameState.rolledValue;
            gameState.lastRoller = message.member.user.username;
            gameState.rollCount += 1;
        } else {
            message.channel.send(`Roll #${gameState.rollCount}.\n${message.member.user.username} has rolled a ${gameState.rolledValue} and has lost the deathroll. Better luck next time`);
            gameState.inProgress = false;
            gameState.expectedRoll = 69420;
            gameState.playerList = [];
            gameState.lastRoller = '';
            gameState.rollCount = 1;
        }
    }
}