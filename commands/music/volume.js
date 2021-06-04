const Discord = require('discord.js')

module.exports = {
    commands: ['volume', 'audio'],
    category: 'Music',
    description: 'Change the volume of the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        
        client.distube.setVolume(message, args[0]);
    }
}