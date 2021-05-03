const gameState = require('../gamestate.js');

module.exports = {
    name: 'rollstart',
    description: 'Starts a deathroll',

    execute(message, args) {
        gameState.inProgress = true;
        message.channel.send('type !join to join the deathroll');
    }
}