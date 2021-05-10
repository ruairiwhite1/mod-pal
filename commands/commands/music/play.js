const distube = require('distube')

module.exports = {
    commands: ['play', 'p'],
    maxArgs: 1,
    expectedArgs: "[]",
    description: 'Displays a users balance',
    callback: async (message, args, bot) => {
        const music = args.join(" ");
        
        bot.distube.play(message, music)
    }
}