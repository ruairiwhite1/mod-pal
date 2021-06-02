const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@util/reactionrole")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
        name: 'dm',
        aliases: ["reactionrolesdm", "rrdirectmessages", "rrdm"],
        description: 'Enable / Disable Reaction Role DMs',
        category: 'Reaction Role',
        cooldown: '3s',
        expectedArgs: 'on / off',
        permissions: ['MANAGE_GUILD'],
        callback: async ({ message, args, text, client, prefix, instance }) => {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

      
    
      let fail = '☹️'
      let success = '🎉'

   let properUsage = new MessageEmbed()
        .setColor('PINK')
        .setDescription(`__**Proper Usage**__\n\n\`1-\` ${prefix}rrdm on\n\`2-\` ${prefix}rrdm off`)
        .setFooter('Developed by Ruairiw8')

      if (args.length < 1) {
        return message.channel.send(properUsage);
      }

 
      if (args.includes('disable') || args.includes('off')) {
  
      await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
 if(guild.reactionDM === false) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} DMs are already disabled`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')
 )
        guild.updateOne({
          reactionDM: false
        })
        .catch(err => console.error(err));

message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Reaction Role DMs have been disabled!`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('GREEN')
 )
    })
      } else if (args.includes('enable') || args.includes('on')) {


     await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {

 if(guild.reactionDM === true) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} DMs are already enabled`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED'))
        guild.updateOne({
          reactionDM: true
        })
        .catch(err => console.error(err));

 
message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Reaction Role DMs have been enabled!`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('GREEN')
 )

   })

    } else if(args[0]) {
     message.channel.send(properUsage) 
    } else {
 message.channel.send(properUsage) 

    }


    }
};