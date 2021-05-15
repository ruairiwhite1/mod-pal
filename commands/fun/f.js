const Discord = require("discord.js");
const { MessageEmbed, DiscordAPIError } = require("discord.js");

module.exports = {
    commands: "f",
    description: "f command - inc. MessageEmbed",
    callback: async (client, message, args) => {

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
             .setAuthor(`${message.author} has paid their respects`)
             .setColor("RANDOM")
            .setFooter('Press 🇫 to pay your respects') // You can change the emoji here to an custom one.
            message.channel.send(embed).then(m => m.react("🇫")).catch(() => { });


        }

        else {
                const embed = new Discord.MessageEmbed()
                .setAuthor('\u2000', message.author.displayAvatarURL({ format: 'png' }))
                .setColor('PURPLE')
                 message.channel.send(embed).then(m => m.react("🇫")).catch(() => {});
            }
        }


    }
