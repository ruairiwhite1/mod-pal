const prefix = ('!')
const Discord = require('discord.js')
const logo = 'https://cdn.discordapp.com/attachments/658589666286632960/841329353061171210/3043526380_fd0b1df072_b.png'

module.exports = {
    commands: 'help-other',
    description: 'Displays this help command',
    callback: async (message, arguments, client) => {
        const embed = new Discord.MessageEmbed()
                .setTitle(`Imagination Bot Commands`)
                .setDescription(`Below is some of the commands you can use!`)
                .setColor('LUMINOUS_VIVID_PINK')
                .setThumbnail(logo)
                .addFields(
                {
                    name: '**Economy Commands**',
                    value: 'Use these commands with the bot!',
                    inline: false
                },
                {
                    name: `${prefix}addbal`,
                    value: 'Add money to a users account',
                    inline: true
                },
                {
                    name: `${prefix}bal`,
                    value: 'Displays a users balance',
                    inline: true
                },
                {
                    name: `${prefix}pay`,
                    value: 'Pay a user some of your money',
                    inline: true
                },
                {
                    name: `${prefix}work`,
                    value: 'Work hard and earn some money',
                    inline: true
                },
                {
                    name: '**Moderation Commands**',
                    value: 'Use these commands with the bot!',
                    inline: false
                },
                {
                    name: `${prefix}ban`,
                    value: 'Bans a user from the discord',
                    inline: true
                },
                {
                    name: `${prefix}clears`,
                    value: 'Clears a discord channel',
                    inline: true
                },
                {
                    name: `${prefix}report`,
                    value: 'Report a user for breaking the rules',
                    inline: true
                },
                {
                    name: `${prefix}warn`,
                    value: 'Warn a user',
                    inline: true
                },
                {
                    name: `${prefix}listwarnings`,
                    value: 'Displays a users warnings',
                    inline: true
                },
                {
                    name: '**Miscellaneous Commands**',
                    value: 'Use these commands with the bot!',
                    inline: false
                },
                {
                    name: `${prefix}help`,
                    value: 'Displays this help menu',
                    inline: true
                },
                {
                    name: `${prefix}info`,
                    value: 'Displays the servers info',
                    inline: true
                },
                {
                    name: `${prefix}ping`,
                    value: 'Displays the bots ping',
                    inline: true
                },
            )
        message.channel.send(embed)
                }
                }