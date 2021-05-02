const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');


const prefix = '!';

let inProgress = false;
let playerList = []
let expectedRoll = 69420;
let lastRoller = '';
let rollCount = 1;

mongoose.
    connect(`mongodb+srv://Niubee:Thequickbrownfox1a1a1!!@discord-deathroll.zoqlz.mongodb.net/Data`, {

    }).then(console.log('connected to the database'));

client.once('ready', () => {
    console.log('online!');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();



    if (command === 'rollstart' && !inProgress) {
        inProgress = true;
        message.channel.send("type !join to join the roll")
        console.log(inProgress);
    }

    if (command === 'join' && inProgress && playerList.length != 2) {
        if (!(playerList.includes(message.member.user.username))) {
            playerList.push(message.member.user.username);
        } else {
            return
        }

        message.channel.send(playerList);
        if (playerList.length === 2) {
            message.channel.send(`The deathroll between ${playerList[0]} and ${playerList[1]} will start, either player start the battle by typing "!roll 69420"`)
        }
    }

    if (command === 'roll' && inProgress && playerList.includes(message.member.user.username)) {
        console.log(args)

        if (args[0] != expectedRoll) {
            message.channel.send(`Please roll the correct number, ${expectedRoll}`)
            return
        } else if (lastRoller === message.member.user.username) {
            message.channel.send('Please wait your turn');
            return
        }

        let rolledValue = parseInt(Math.random() * expectedRoll + 1);

        if (rolledValue != 1) {
            message.channel.send(`Roll #${rollCount}. ${message.member.user.username} has rolled a ${rolledValue}. Next player please '!Roll ${rolledValue}`);
            message.channel.send(`'`);
            expectedRoll = rolledValue
            lastRoller = message.member.user.username;
            rollCount += 1;
        } else {
            message.channel.send(`Roll #${rollCount}. ${message.member.user.username} has rolled a ${rolledValue} and has lost the deathroll, better luck next time`)
            inProgress = false;
            expectedRoll = 69420;
            playerList = [];
            lastRoller = '';
            rollCount = 1;
        }

    }

    if (command === 'check') {
        console.log('-----------')
        console.log(inProgress);
        console.log(playerList);
        console.log(message.member.user.username);
    }

});


client.login('ODM1OTg3NDE5MzgzMzMyODg0.YIXb9A.SmTpfkcQrCIhVJawUvBfSK_AfaM')