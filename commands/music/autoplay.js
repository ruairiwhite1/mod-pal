const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['autoplay'],
    category: 'Music',
    description: 'Disable music autoplay from youtube',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}