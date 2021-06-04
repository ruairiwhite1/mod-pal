const Discord = require('discord.js')

module.exports = {
    commands: ['jump'],
    category: 'Music',
    description: 'Jumping to a certain song in a queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        client.distube.jump(message, parseInt(args[0]))
        message.channel.send(`Jumping song!`)
        .catch(err => message.channel.send("Invalid song number."))
    }
};
