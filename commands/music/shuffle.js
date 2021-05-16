const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['shuffle'],
    category: 'Music',
    description: 'Shuffle the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        
        client.distube.shuffle(message)
        message.channel.send('Now shuffling, this may take a second!')
    }
}