const Discord = require('discord.js')
const DisTube = require('distube')

module.exports = {
    commands: ['jump'],
    category: 'Music',
    description: 'Jumping to a certain song in a queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
        distube.jump(message, parseInt(args[0]))
        channel.send(`Jumping song!`)
        .catch(err => message.channel.send("Invalid song number."))
    }
};
