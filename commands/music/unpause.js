const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['unpause', 'resume'],
    category: 'Music',
    description: 'Unpause the music currently playing',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        client.distube.unpause(message)
        message.channel.send('▶️ The music is now unpaused!')
    }
}