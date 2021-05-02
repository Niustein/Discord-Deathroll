require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const gameState = require('./gamestate.js');
const rollFunctions = require('./deathroll.js');


const prefix = '!';

client.once('ready', () => {
    console.log('online!');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'rollstart' && !gameState.inProgress) {
        rollFunctions.rollstart();
        message.channel.send('type !join to join the deathroll');

    }

    if (command === 'join' && gameState.inProgress && gameState.playerList.length != 2) {
        //console.log(message.member.user.username);
        if (rollFunctions.join(message.member.user.username)) {
            message.channel.send(`Current players: ${gameState.playerList}`);
        } else {
            message.channel.send(`You're already signed up!`)
            message.channel.send(`Current players: ${gameState.playerList}`);
        };


        if (gameState.playerList.length === 2) {
            message.channel.send(`The deathroll between ${gameState.playerList[0]} and ${gameState.playerList[1]} will start, either player start the battle by typing "!roll 69420"`)
        }
    }

    if (command === 'roll'
        && gameState.inProgress
        && gameState.playerList.includes(message.member.user.username)
        && gameState.playerList.length === 2) {

        if (args[0] != gameState.expectedRoll) {
            message.channel.send(`Please roll the correct number, ${gameState.expectedRoll}`)
            return
        } else if (gameState.lastRoller === message.member.user.username) {
            message.channel.send('Please wait your turn!');
            return
        }

        let rolledValue = gameState.rolledValue = parseInt(Math.random() * gameState.expectedRoll + 1);
        let rollCount = gameState.rollCount;

        if (rolledValue != 1) {
            message.channel.send(`Roll #${rollCount}. ${message.member.user.username} has rolled a ${rolledValue}. Next player please '!Roll ${rolledValue}`);
            rollFunctions.updateRoll(message.member.user.username, rolledValue);
        } else {
            message.channel.send(`Roll #${rollCount}. ${message.member.user.username} has rolled a ${rolledValue} and has lost the deathroll, better luck next time`)
            rollFunctions.resetVariables();
        }
    }

    if (command === 'check') {
        console.log('-----------')
        console.log(gameState.inProgress);
        console.log(gameState.playerList);
        console.log(message.member.user.username);
    }

});


client.login(process.env.TOKEN)