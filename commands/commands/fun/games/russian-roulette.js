const economy = require('@features/economy')
const Discord = require('discord.js');

module.exports = {
    commands: ['russian-roulette', 'rr'],
    description: 'Play russian roulette you have a 1 in 6 chance of losing.',
    callback: async (message, args, text, client) => {
        if(!args[0]) return message.channel.send('Please specify an amount to bet!')

        if(isNaN(args[0])) return message.channel.send('Argument must be a number')

        const amountToBet = parseInt(args[0]);

        const userId = message.author.id 
        const guildId = message.guild.id 

        const coinsOwned = await economy.getCoins(guildId, userId)

        if (coinsOwned < amountToBet) {
            message.channel.send(`You do not have ${amountToBet} coins!`)
            return
        }

        const winAmount = amountToBet * 2

        let random = Math.random() * 100;

        if (random < 100 / 6) {
            message.channel.send(`🔥🔫 You died and lost ${amountToBet}.`);
            economy.addCoins(
                guildId,
                userId,
                amountToBet * -1
            )
         } else {
            message.channel.send(`😣🔫 You\'re safe and won ${winAmount}`);
            economy.addCoins(
                guildId,
                userId,
                amountToBet * 2
            )
         } 
        }
    }