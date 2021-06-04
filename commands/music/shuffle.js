const Discord = require('discord.js')

module.exports = {
    commands: ['shuffle'],
    category: 'Music',
    description: 'Shuffle the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        
        client.distube.shuffle(message)
        message.channel.send('Now shuffling, this may take a second!')
    }
}