const Discord = require('discord.js');
const canvacord = require('canvacord')
const Levels = require('discord-xp')

module.exports = {
    commands: ['rank', 'level', 'lvl'],
    expectedArgs: "<The target's @>",
    category: 'Information',
    description: 'Displays a users rank',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild.id)
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        const rankcard = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({format: 'png', dynamic: true}))
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(message.member.presence.status)
            .setLevel(user.level)
            .setRank(1, 'RANK', false)
            .setProgressBar("#a81d16", "COLOR")
            .setOverlay("#000000")
            .setUsername(message.author.username)
            .setDiscriminator(target.discriminator)
            .setBackground("COLOR", "#808080")
            rankcard.build()
            .then(data => {
                const atta = new Discord.MessageAttachment(data, "rank.png")
                message.channel.send(atta)
            })
        }
    }