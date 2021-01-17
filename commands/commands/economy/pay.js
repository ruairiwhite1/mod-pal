const economy = require('@features/economy')

module.exports = {
    commands: 'pay',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<target user's a> <amount of coins>",
    description: 'Give a user some of your own money',
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify a user to pay!')
            return
        }

        const coinsToGive = arguments[1]
        if (isNaN(coinsToGive)) {
            message.reply('Please specify a valid amount of coins')
            return
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < coinsToGive) {
            message.reply(`You do not have ${coinsToGive} coins!`)
            return
        }

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
        )
        const newBalance = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive
        )

        message.reply(`You have given <@${target.id}> ${coinsToGive} coins! They now have ${newBalance} coins and you have ${remainingCoins} coins.`)
    }
}