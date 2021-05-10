const distube = require('distube')

module.exports = {
    commands: ['play', 'p'],
    maxArgs: 1,
    expectedArgs: "[]",
    description: 'Plays music through a voice channel',
    callback: async (message, args, client) => {
        const music = args.join(" ");
        
        client.distube.play(message, music)
    }
}