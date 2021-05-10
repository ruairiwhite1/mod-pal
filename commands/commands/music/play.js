const distube = require('distube')

module.exports = {
    commands: ['play', 'p'],
    maxArgs: 1,
    expectedArgs: "[]",
    description: 'Displays a users balance',
    callback: async (message, args, client) => {
        const music = args.join(" ");
        
        client.distube.play(message, music)
    }
}