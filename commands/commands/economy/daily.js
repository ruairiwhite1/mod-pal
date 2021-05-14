const economy = require('@features/economy')
const Discord = require('discord.js');

module.exports = {
    commands: 'daily',
    description: 'Earn a daily amount of coins!',
    cooldown: 60 * 60 * 24,
    callback: async (message, arguments, text, client) => {
        const coins = Math.floor(Math.random() * 1000) + 1;

        const userId = message.author.id 
        const guildId = message.guild.id 

        const newCoins = await economy.addCoins(guildId, userId, coins)

        message.channel.send(`Thank you for claiming your daily reward, You earned **${coins}**. You now have **${newCoins}**.`);
    }
}