const economy = require('@features/economy')

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <coin amount>",
    permissionError: 'You must be an administrator to use this command.',
    permissions: 'ADMINISTRATOR',
    description: 'Add money to a users account',
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first()

        if (!mention) {
            message.reply('Please specify a user to add coins to.')
            return
        }

        const coins = arguments[1]
        if (isNaN(coins)) {
            message.reply('Please provide a valid number of coins')
            return
        }

        const guildId = message.guild.id 
        const userId = mention.id 

        const newCoins = await economy.addCoins(guildId, userId, coins)

        message.reply(`You have given <@${userId}> ${coins} coin(s)! They now have ${newCoins} coin(s)!`)
    },
}