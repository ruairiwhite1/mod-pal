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
        const target = await Levels.fetch(message.author.id, message.guild.id);
        const guildId = message.guild.id
        const userId = target.id
        let { xp, currentLevel } = result
        var level = levels.level(guildId, userId) || 0;
        var currentxp = levels.xp(guildId, userId) || 0;
        var xpNeeded = levels.getNeededXP(guildId, userId)
        const rankcard = new Canvacord.Rank()
            .setAvatar(target.displayAvatarURL({format: 'png', dynamic: true}))
            .setCurrentXP(user.xp) || 0
            .setRequiredXP(neededXp)
            .setStatus(target.presence.status)
            .setLevel(user.level)
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
            })
        }
    }