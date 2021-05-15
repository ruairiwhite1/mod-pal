const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['stop', 's', 'leave'],
    category: 'Music',
    description: 'Stop the music playing in',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        client.distube.stop(message)
        message.channel.send('The music has been stopped')
    }
}