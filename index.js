require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const prefix = '!';

// command handler
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
// };

// folder handler
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('online!');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.replay('There was an error tryign to execute that command');
    }

});

client.login(process.env.TOKEN)