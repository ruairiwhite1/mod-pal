const { MessageEmbed } = require('discord.js')
const { version } = require('@root/package.json')

module.exports = {
      name: 'botinfo',
      category: 'Information',
      description: 'Displays bot information',
      callback: async ({ message, args, text, client, prefix, instance }) => {
    
        const totalMembers = message.guild.members.cache
    
        const embed = new MessageEmbed()
          .setAuthor(
            `Information about the ${client.user.username}`,
            client.user.displayAvatarURL()
          )
          .addFields(
            {
              name: 'Bot tag',
              value: client.user.tag,
            },
            {
              name: 'Version',
              value: version,
            },
            {
              name: "Server's command prefix",
              value: message.guild.commandPrefix,
            },
            {
              name: 'Time since last restart',
              value: `${process.uptime().toFixed(2)}s`,
            },
            {
              name: 'Server count',
              value: client.guilds.cache.size,
            },
            {
              name: 'Total members',
              value: totalMembers,
            }
          )
    
        message.channel.send(embed)
      }
    }