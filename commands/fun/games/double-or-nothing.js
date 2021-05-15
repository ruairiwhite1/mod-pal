const economy = require('@features/economy')
const Discord = require('discord.js');

module.exports = {
    commands: ['double-or-nothing', 'don', 'double'],
    category: 'Games',
    description: 'Play double or nothing to win big money the more you play the bigger pot',
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

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        };

        if(random() === true ) {
            const winAmount = amountToBet * 2;
            message.channel.send(`Congrats you have won ${winAmount} coins!`);
            economy.addCoins(guildId, userId, winAmount)
        } else {
            message.channel.send(
                `Aww you lost ${amountToBet} coins. Better luck next time!`
            );
            economy.addCoins(
                guildId,
                userId,
                amountToBet * -1
            )
        }
    }
}