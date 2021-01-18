const levels = require('@features/levels')

module.exports = {
    commands: ['rank', 'level'],
    maxArgs: 1,
    expectedArgs: "[]",
    description: 'Displays a users rank',
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const rank = await levels.getRank(guildId, userId)

        message.reply(`That user's rank is rank ${rank}!`)
    },
}