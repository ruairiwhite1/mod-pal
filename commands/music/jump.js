const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")
module.exports = {
    commands: ['jump'],
    category: 'Music',
    description: 'Jumping to a certain song in a queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {
            searchSongs: 10,
            emitNewSongOnly: true,
            plugins: [new SpotifyPlugin({ parallel: true })]
        })
        distube.jump(message, parseInt(args[0]))
        channel.send(`Jumping song!`)
        .catch(err => message.channel.send("Invalid song number."))
    }
};
