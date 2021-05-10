const prefix = ('!')
const Discord = require('discord.js')
const logo = 'https://cdn.discordapp.com/attachments/658589666286632960/841329353061171210/3043526380_fd0b1df072_b.png'

module.exports = {
    commands: 'help-fun',
    description: 'Displays this help command',
    callback: async (message, arguments, client) => {
        const embed = new Discord.MessageEmbed()
                .setTitle(`Imagination Bot Fun Commands`)
                .setDescription(`Below is all the fun commands you can use!`)
                .setColor('LUMINOUS_VIVID_PINK')
                .setThumbnail(logo)
                .addFields(
                    {
                        name: '**Fun Commands**',
                        value: 'Use these commands with the bot!',
                        inline: false
                    },
                    {
                        name: `${prefix}8ball`,
                        value: 'Stuck on something, ask the 8ball',
                        inline: true
                    },
                    {
                        name: `${prefix}ascii`,
                        value: 'Turns your text into ascii',
                        inline: true
                    },
                    {
                        name: `${prefix}avatar`,
                        value: 'Displays a users avatar',
                        inline: true
                    },
                    {
                        name: `${prefix}coinflip`,
                        value: 'Flip a coin, heads or tails?',
                        inline: true
                    },
                    {
                        name: `${prefix}emojify`,
                        value: 'Emojifys your text',
                        inline: true
                    },
                    {
                        name: `${prefix}fortunecookie`,
                        value: 'Get a fortune saying',
                        inline: true
                    },
                    {
                        name: `${prefix}meme`,
                        value: 'Get a meme from reddit',
                        inline: true
                    },
                    {
                        name: `${prefix}double-or-nothing`,
                        value: 'Bet some money, will it double or will you loose',
                        inline: true
                    },
                    {
                        name: `${prefix}fast-type`,
                        value: 'How fast can you type? Lets find out!',
                        inline: true
                    },
                    {
                        name: `${prefix}rps`,
                        value: 'Play rps against me!',
                        inline: true
                    },
                    {
                        name: `${prefix}russian-roulette `,
                        value: 'Place a bet, then spin the barrel',
                        inline: true
                    },
                    {
                        name: `${prefix}slots`,
                        value: 'Are you lucky?',
                        inline: true
                    },
                    {
                        name: `${prefix}uno`,
                        value: 'Start a game of uno!',
                        inline: true
                    },
                )
                message.channel.send(embed)
    }
}