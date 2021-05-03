module.exports = {
    name: 'help',
    aliases: ['commands'],

    execute(message) {
        message.channel.send(`!rollstart #\t (!rs)\t   Starts a roll (# is optional, defaults to 69420)
!join \t\t\t\t(!j)\t\t to join a deathroll
!roll #\t\t\t  (!r #)\t to roll (# is required)`)
    }
}