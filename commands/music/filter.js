const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")
module.exports = {
    commands: ['setfilter'],
    category: 'Music',
    expectedArgs: "<filter: 3d/nightcore/bassboost/karaoke/echo/vaporwave/earwax>",
    description: 'Changes the filter of the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        const filter = args[0]

        client.distube.setFilter(message, filter);
        message.channel.send(`The filter has been updated to ${filter}!`)
    }
}