const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")
module.exports = {
    commands: ['unpause', 'resume'],
    category: 'Music',
    description: 'Unpause the music currently playing',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        
        client.distube.unpause(message)
        message.channel.send('▶️ The music is now unpaused!')
    }
}