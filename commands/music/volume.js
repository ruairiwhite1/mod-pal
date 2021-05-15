const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['volume', 'audio'],
    category: 'Music',
    description: 'Change the volume of the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        client.distube.setVolume(message, args[0]);
    }
}