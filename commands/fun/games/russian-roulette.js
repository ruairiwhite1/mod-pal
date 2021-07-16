const economy = require('@features/economy')
const Discord = require('discord.js');
const { min } = require('moment');

module.exports = {
    commands: ['russian-roulette', 'rr', 'newrr'],
    category: 'Games',
    description: 'Play russian roulette you have a 1 in 6 chance of losing.',
    callback: async ({ message, args, text, client, prefix, instance }) => {
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
        let multiOptions = ['1', '2', '1']
        let multi = multiOptions[Math.floor(Math.random() * multiOptions.length)]
        let random = Math.random() * 100;
        let amount = amountToBet * multi
        const winAmount = amount[Math.floor(Math.round(amount))]

        if (random < 100 / 6) {
            message.channel.send(`🔥🔫 You died and lost ${amountToBet}.`);
            economy.addCoins(
                guildId,
                userId,
                winAmount
            )
         } else {
            message.channel.send(`😣🔫 You\'re safe and won ${amountToBet * multi}, with a multiplier of ${multi}`);
            economy.addCoins(
                guildId,
                userId,
                winAmount
            )
        }} 
        }