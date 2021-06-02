const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['pause'],
    category: 'Music',
    description: 'Pause the music currently playing',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        
        client.distube.pause(message)
        message.channel.send('⏸ The music is now paused!')
    }
}