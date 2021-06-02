const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")
module.exports = {
    commands: ['seek'],
    category: 'Music',
    description: 'Seek to a certain part in the music',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        
        client.distube.seek(message, Number(args[0]))
        message.channel.send('Now seeking...')
    }
}