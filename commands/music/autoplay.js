const Discord = require('discord.js')

module.exports = {
    commands: ['autoplay'],
    category: 'Music',
    description: 'Disable music autoplay from youtube',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        
        let mode = client.distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}