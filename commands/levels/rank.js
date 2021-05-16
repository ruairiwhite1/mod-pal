const levels = require('@features/levels')
const request = require('node-superfetch');
const fsn = require("fs-nextra");
const Discord = require('discord.js');
const profileSchema = require('@schemas/profile-schema')
const {
    Canvas
  } = require('canvas-constructor');

module.exports = {
    commands: ['rank', 'level', 'lvl'],
    expectedArgs: "<The target's @>",
    category: 'Information',
    description: 'Displays a users rank',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        var target = message.mentions.users.first() || message.author;
        const guildId = message.guild.id
        const userId = target.id
        const addXP = async (guildId, userId, xpToAdd, message) => {
            await mongo().then(async (mongoose) => {
              try {
            const result = await profileSchema.findOneAndUpdate(
                {
                guildId,
                userId,
                },
                {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd,
                },
                },
                {
                upsert: true,
                new: true,
                }
            )
            } finally {
                mongoose.connection.close()
    
        let { xp, currentLevel } = result
        var level = levels.level(guildId, userId) || 0;
        var currentxp = levels.xp(guildId, userId) || 0;
        var xpNeeded = levels.getNeededXP(guildId, userId)
        const rankcard = new Canvacord.Rank()
            .setAvatar(target.displayAvatarURL({format: 'png', dynamic: true}))
            .setCurrentXP(levels.xp(guildId, userId) || 0)
            .setRequiredXP(xpNeeded)
            .setStatus(target.presence.status)
            .setLevel(levels.level(guildId, userId) || 0)
            .setRank(1, 'RANK', false)
            .setProgressBar("#a81d16", "COLOR")
            .setOverlay("#000000")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator)
            .setBackground("COLOR", "#808080")
            rankcard.build()
            .then(data => {
                const atta = new Discord.MessageAttachment(data, "rank.png")
                message.channel.send(atta)
                console.log(`xpNeeded: ${xpNeeded}`);
                console.log(`result: ${result}`);
                console.log(`Level: ${level}`)
            })
        }
    }
    )
}
}
}