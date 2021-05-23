const { MessageEmbed } = require("discord.js");
const economy = require('@features/economy')

module.exports = {
        name: "roulette",
        aliases: ["roul"],
        category: "Games",
        description: "Bet a colour to win or lose",
        expectedArgs: "[colour]<amount>",
        callback: async ({ message, args, text, client, prefix, instance }) => {

        let user = message.author;
        const userId = message.author.id 
        const guildId = message.guild.id 

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await economy.getCoins(guildId, userId)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Specify an amount to gamble | ${prefix}roulette <color> <amount>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ You are betting more than you have`);

        let colorbad = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Specify a color | Red [1.5x] (normal) Black [2x] (hard) Green [15x](rare)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            economy.addCoins(guildId, userId, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You won ${money} coins\n\nMultiplier: 15x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            economy.addCoins(guildId, userId, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 You won ${money} coins\n\nMultiplier: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            economy.addCoins(guildId, userId, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ You won ${money} coins\n\nMultiplier: 2x`);
            message.channel.send(moneyEmbed3)
        } else {// Wrong
            economy.addCoins(guildId, userId, money * -1)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You lost ${money} coins\n\nMultiplier: 0x`);
            message.channel.send(moneyEmbed4)
        }
          economy.addCoins(`games_${user.id}`, 1)
    }
}