const Discord = require('discord.js')

module.exports = {
    commands: ['pause'],
    category: 'Music',
    description: 'Pause the music currently playing',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        client.distube.pause(message)
        message.channel.send('⏸ The music is now paused!')
    }
}