const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['unpause', 'resume'],
    category: 'Music',
    description: 'Seek to a certain part in the music',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        client.distube.seek(message, Number(args[0]))
        message.channel.send('Now seeking...')
    }
}