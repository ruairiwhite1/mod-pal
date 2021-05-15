const economy = require('@features/economy')

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <coin amount>",
    category: 'Economy',
    requiredPermissions: ['ADMINISTRATOR'],
    description: 'Add money to a users account',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const mention = message.mentions.users.first()

        if (!mention) {
           message.channel.send('Please specify a user to add coins to.')
            return
        }

        const coins = args[1]
        if (isNaN(coins)) {
           message.channel.send('Please provide a valid number of coins')
            return
        }

        const guildId = message.guild.id 
        const userId = mention.id 

        const newCoins = await economy.addCoins(guildId, userId, coins)

       message.channel.send(`You have given <@${userId}> ${coins} coin(s)! They now have ${newCoins} coin(s)!`)
    },
}