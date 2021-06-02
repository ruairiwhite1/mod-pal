const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['skip', 'next'],
    category: 'Music',
    description: 'Skip the current song',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        
        client.distube.skip(message);
        message.channel.send('Skipping the current song!');
    }
}