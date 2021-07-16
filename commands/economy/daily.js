const economy = require('@features/economy')
const Discord = require('discord.js');
const mongo = require('@util/mongo')
const dailyRewardsSchema = require('@schemas/daily-rewards-schema')

module.exports = {
    commands: 'daily',
    cooldown: '24h',
    description: 'Earn a daily amount of coins!',
    callback: async ({ message, args, text, client, prefix, instance }) => {
       const coins = Math.floor(Math.random() * 10000) + 1;

        const userId = message.author.id 
        const guildId = message.guild.id 

        const newCoins = await economy.addCoins(guildId, userId, coins)

        message.channel.send(`Thank you for claiming your daily reward, You earned **${coins}**. You now have **${newCoins}**.`);
    }
}