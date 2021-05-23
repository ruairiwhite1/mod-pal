const { MessageEmbed } = require("discord.js");
const economy = require('@features/economy')
const mongo = require('@util/mongo')

module.exports = {
        name: "beg",
        category: "Economy",
        description: "Beg for money",
        usage: " ",
        cooldown: '12h',
        callback: async ({ message, args, text, client, prefix, instance }) => {
        const userId = message.author.id 
        const guildId = message.guild.id 

        let amount = 20;

            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You've begged and received ${amount} coins`);
            message.channel.send(moneyEmbed)
            economy.addCoins(guildId, userId, 20)


        }
    }