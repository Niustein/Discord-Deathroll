const Discord = require('discord.js');
const client = new Discord.Client();

const gameState = require('./gamestate.js');

function rollstart() {
    gameState.inProgress = true;
};

function join(username) {
    let playerList = gameState.playerList;
    console.log(username, playerList)
    if (!(playerList.includes(username))) {
        playerList.push(username);
    } else {
        return
    }
};
function updateRoll() {

};

function resetVariables() {
    gameState.inProgress = false;
    gameState.expectedRoll = 69420;
    gameState.playerList = [];
    gameState.lastRoller = '';
    gameState.rollCount = 1;
}

module.exports = {
    rollstart, join, updateRoll, resetVariables
}