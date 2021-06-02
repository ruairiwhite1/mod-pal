const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")

module.exports = {
    commands: ['play', 'p'],
    category: 'Music',
    description: 'Play music in your own voice channel',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const embed = new Discord.MessageEmbed
        .setTitle("🎵 Music Player")
        .setDescription("▶️ Title **$**")
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        client.distube.play(message, args.join(' '))
    }
}