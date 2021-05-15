const economy = require('@features/economy')

module.exports = {
    commands: 'pay',
    minArgs: 2,
    maxArgs: 2,
    category: 'Economy',
    expectedArgs: "<target user's a> <amount of coins>",
    description: 'Give a user some of your own money',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) {
            message.channel.send('Please specify a user to pay!')
            return
        }

        const coinsToGive = args[1]
        if (isNaN(coinsToGive)) {
            message.channel.send('Please specify a valid amount of coins')
            return
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < coinsToGive) {
            message.channel.send(`You do not have ${coinsToGive} coins!`)
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

        message.channel.send(`You have given <@${target.id}> ${coinsToGive} coins! They now have ${newBalance} coins and you have ${remainingCoins} coins.`)
    }
}