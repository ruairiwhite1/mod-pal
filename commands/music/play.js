const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['play', 'p'],
    category: 'Music',
    description: 'Play music in your own voice channel',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        client.distube.play(message, args.join(' '))
    }
}