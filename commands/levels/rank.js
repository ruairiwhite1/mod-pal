const Discord = require('discord.js');
const canvacord = require('canvacord')
const Levels = require('discord-xp')

module.exports = {
    commands: ['rank', 'level', 'lvl', 'testrank'],
    expectedArgs: "<The target's @>",
    category: 'Information',
    description: 'Displays a users rank',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const data = message.mentions.users.first() || message.author
        const member = message.mentions.users.first() || message.author
        const user = await Levels.fetch(data.id, message.guild.id)
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (!user) message.reply('You do not have a rank yet, trying talk to earn some xp!')
        const rankcard = new canvacord.Rank()
            .setAvatar(data.displayAvatarURL({format: 'png', dynamic: true}))
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(data.presence.status)
            .setLevel(user.level)
            .setRank(1, 'RANK', false)
            .setProgressBar("#a81d16", "COLOR")
            .setOverlay("#000000")
            .setUsername(data.username)
            .setDiscriminator(data.discriminator)
            .setBackground("COLOR", "#808080")
            rankcard.build()
            .then(data => {
                const atta = new Discord.MessageAttachment(data, "rank.png")
                message.channel.send(atta)
            })
        }
    }