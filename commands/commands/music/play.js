const distube = require('distube')

module.exports = {
    commands: ['play', 'p'],
    expectedArgs: "[]",
    description: 'Plays music through a voice channel',
    callback: async (message, args, client) => {
        const music = args.join(' ');
        
        distube.play(message, music)
    }
}