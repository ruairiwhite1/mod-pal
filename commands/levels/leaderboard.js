const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')
const Levels = require('discord-xp')
const Discord = require('discord.js')

module.exports = {
    commands: ['leaderboard', 'levels', 'lb'],
    expectedArgs: "<The target's @>",
    category: 'Information',
    description: 'Displays a servers rank leaderboard',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
    
    const embed = new Discord.MessageEmbed()
    .setColor("0xe71177")
    .setTitle("**Leaderboard**")
    .setDescription(lb.join("\n\n"))
    .setThumbnail(message.guild.iconURL({ dynamic: true }))

    //message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    message.channel.send(embed)
    }
} 