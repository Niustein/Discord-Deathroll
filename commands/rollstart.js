const gameState = require('../gamestate.js');

module.exports = {
    name: 'rollstart',
    description: 'Starts a deathroll',

    execute(message, args) {
        if (gameState.inProgress) return;
        if (parseInt(args[0])) {
            gameState.expectedRoll = args[0];
        }
        console.log(gameState.expectedRoll);
        gameState.inProgress = true;
        message.channel.send('type !join to join the deathroll');
    }
}