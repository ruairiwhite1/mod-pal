const economy = require('@features/economy')
const Discord = require('discord.js');
const mongo = require('@util/mongo')
const dailyRewardsSchema = require('@schemas/daily-rewards-schema')

let claimedCache = []

const clearCache = () => {
    claimedCache = []
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

module.exports = {
    commands: 'daily',
    description: 'Earn a daily amount of coins!',
    callback: async (message, arguments, text, client) => {
        const { guild, member } = message
        const { id } = member

        if (claimedCache.includes(id)) {
            console.log('Returning from cache')
            message.reply('You have already claimed daily reward within the last 24 hours')
            return
        }

        console.log('Fetching from mongo!')

        const obj = {
            guildId: guild.id,
            userId: id
        }

        await mongo().then(async mongoose => {
            try {
                const results = await dailyRewardsSchema.findOne(obj)

                console.log('RESULTS:', results)
            } finally {
                mongoose.connection.close
            }
        })

       // const coins = Math.floor(Math.random() * 1000) + 1;

        //const userId = message.author.id 
        //const guildId = message.guild.id 

        //const newCoins = await economy.addCoins(guildId, userId, coins)

        //message.channel.send(`Thank you for claiming your daily reward, You earned **${coins}**. You now have **${newCoins}**.`);
    }
}