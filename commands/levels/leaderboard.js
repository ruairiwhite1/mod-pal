const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')
const Levels = require('discord-xp')

module.exports = {
    commands: ['leaderboard', 'levels', 'lb'],
    expectedArgs: "<The target's @>",
    category: 'Information',
    description: 'Displays a servers rank leaderboard',
    callback: async ({ message, args, text, client, prefix, instance }) => {
const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return message.reply("Nobody's in leaderboard yet.");

        const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(`${lb.join("\n\n")}}`)
    }
} 