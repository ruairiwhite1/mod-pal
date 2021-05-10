const prefix = ('!')
const Discord = require('discord.js')
const logo = 'https://cdn.discordapp.com/attachments/658589666286632960/841329353061171210/3043526380_fd0b1df072_b.png'

module.exports = {
    commands: ['commands', 'help'],
    description: 'Displays this help command',
    callback: async (message, arguments, client) => {
        const embed = new Discord.MessageEmbed()
                .setTitle(`Imagination Bot Commands`)
                .setDescription(`Below is all the commands you can use!`)
                .setColor('LUMINOUS_VIVID_PINK')
                .setThumbnail(logo)
                .addFields(
                    {
                        name: '**Music Commands**',
                        value: 'Use these commands with the bot!',
                        inline: false
                    },
                    {
                        name: `${prefix}play`,
                        value: 'Plays music in a voice channel',
                        inline: true
                    },
                    {
                        name: `${prefix}stop`,
                        value: 'Stops music in a voice channel',
                        inline: true
                    },
                    {
                        name: `${prefix}skip`,
                        value: 'Skips the current song being played',
                        inline: true
                    },
                    {
                        name: `${prefix}pause`,
                        value: 'Pauses the current song being played',
                        inline: true
                    },
                    {
                        name: `${prefix}resume`,
                        value: 'Resumes the current song being played',
                        inline: true
                    },
                    {
                        name: `${prefix}queue`,
                        value: 'Displays the current queue',
                        inline: true
                    },
                    {
                        name: `${prefix}shuffle`,
                        value: 'Shuffles the current queue',
                        inline: true
                    },
                    {
                        name: `${prefix}loop`,
                        value: 'Loops the current song',
                        inline: true
                    },
                    {
                        name: `${prefix}volume`,
                        value: 'Adjusts the volume of the current queue',
                        inline: true
                    },
                    {
                        name: `${prefix}3d`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}bassboost`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}echo`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}karaoke`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}nightcore`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}vaporwave`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}flanger`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}gate`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}haas`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}reverse`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}surround`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}mcompand`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}phaser`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}tremolo`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
                    {
                        name: `${prefix}earwax`,
                        value: 'Changes the queues current filter',
                        inline: true
                    },
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
                        name: '**Games**',
                        value: 'Use these commands with the bot!',
                        inline: false
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