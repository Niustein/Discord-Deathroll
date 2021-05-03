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

    // if (!client.commands.has(command)) return;

    // const command = client.commands.get(commandName);

    // try{
    //     client.commands.get(command).execute(message,args);
    // }

    if (command === 'rollstart') {
        client.commands.get('rollstart').execute(message, args);
    }

    if (command === 'join') {
        client.commands.get('join').execute(message, args);
    }

    if (command === 'roll') {
        client.commands.get('roll').execute(message, args);
    }
});

client.login(process.env.TOKEN)