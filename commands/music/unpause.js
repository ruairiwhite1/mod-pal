const Discord = require('discord.js')

module.exports = {
    commands: ['unpause', 'resume'],
    category: 'Music',
    description: 'Unpause the music currently playing',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        
        client.distube.unpause(message)
        message.channel.send('▶️ The music is now unpaused!')
    }
}