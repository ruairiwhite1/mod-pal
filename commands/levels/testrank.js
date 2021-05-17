const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')
const Levels = require('discord-xp')

module.exports = {
    commands: ['testrank'],
    expectedArgs: "<The target's @>",
    category: 'Information',
    description: 'Displays a users rank',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You are currently level **${user.level}**!`)
    }
}
