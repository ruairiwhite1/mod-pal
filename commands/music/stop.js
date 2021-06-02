const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")
module.exports = {
    commands: ['stop', 's', 'leave'],
    category: 'Music',
    description: 'Stop the music playing in',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        
        client.distube.stop(message)
        message.channel.send('The music has been stopped')
    }
}