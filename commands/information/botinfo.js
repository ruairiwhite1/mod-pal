const { Client } = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { version } = require('@root/package.json')

module.exports = {
      name: 'botinfo',
      category: 'Information',
      description: 'Displays bot information',
      callback: async ({ message, args, text, prefix, client, instance, guilds }) => {
        const promises = [
          client.shard.fetchClientValues('guilds.size'),
          client.shard.broadcastEval('guilds.reduce((acc, guild) => acc + guild.memberCount, 0)'),
        ];
    
        return Promise.all(promises)
          .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
          })
          .catch(console.error);
      }
        //const embed = new MessageEmbed()
         // .setAuthor(
        //    `Information about the ${client.user.username}`,
       //    client.user.displayAvatarURL()
        //  )
        //  .addFields(
        //    {
        //      name: 'Bot tag',
         //     value: client.user.tag,
         //   },
         //   {
          //    name: 'Version',
          //    value: version,
           // },
           // {
           //   name: "Server's command prefix",
           //   value: message.guild.commandPrefix,
           // },
           // {
           //   name: 'Time since last restart',
           //   value: `${process.uptime().toFixed(2)}s`,
           // },
           // {
           //   name: 'Server count',
           //   value: totalGuilds,
           // },
           // {
           //   name: 'Total members',
           //  value: totalMembers,
           // }
          //)
    
       // return message.channel.send(embed)
      }