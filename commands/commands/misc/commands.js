const prefix = ('!')
const Discord = require('discord.js')
const logo = 'https://cdn.discordapp.com/attachments/658589666286632960/841329353061171210/3043526380_fd0b1df072_b.png'

module.exports = {
    commands: ['commands', 'help'],
    description: 'Displays this help command',
    callback: async (message, arguments, client) => {
        const embed = new Discord.MessageEmbed()
                .setTitle(`Imagination Bot Commands`)
                .setDescription(`I have a lot of commands so they've been split up into different menus`)
                .setColor('LUMINOUS_VIVID_PINK')
                .setThumbnail(logo)
                .addFields(
                    {
                        name: '**Music Commands**',
                        value: `Do ${prefix}help-music for help with music commands`,
                        inline: false
                    },
                    {
                        name: `**Fun Commands**`,
                        value: `Do ${prefix}help-fun for help with fun commands`,
                        inline: false
                    },
                    {
                        name: `**All other Commands**`,
                        value: `Do ${prefix}help-other for help with all my other commands`,
                        inline: false
                    },
                )
                message.channel.send(embed)
    }
}