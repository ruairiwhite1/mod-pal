const economy = require('@features/economy')

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "[]",
    category: 'Economy',
    description: 'Displays a users balance',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const coins = await economy.getCoins(guildId, userId)

        message.channel.send(`That user has ${coins} coins!`)
    },
}