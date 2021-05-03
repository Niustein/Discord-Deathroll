require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const prefix = '!';
const gameState = require('./gamestate.js');

// command handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.once('ready', () => {
    console.log('online!');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'rollstart' && !gameState.inProgress) {
        client.commands.get('rollstart').execute(message, args);
    }

    if (command === 'join' && gameState.inProgress && gameState.playerList.length != 2) {
        client.commands.get('join').execute(message, args);
    }

    if (command === 'roll'
        && gameState.inProgress
        && gameState.playerList.includes(message.member.user.username)
        && gameState.playerList.length === 2) {
        client.commands.get('roll').execute(message, args);
        console.log(`index ${gameState.expectedRoll}`)
    }
});

client.login(process.env.TOKEN)