
const Guild = require('@schemas/guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@root/packages/reactionrole/reaction.js")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
    name: ["dm","reactionrolesdm", "rrdirectmessages", "rrdm"],
    description: 'Enable / Disable Reaction Role DMs',
    expectedArgs: 'on / off',
    permissions: 'MANAGE_GUILD',
    callback: async (message, args) => {
        let client = message.client
    
           const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
    
          
        
          const fail = ('☹️')
          const success = ('🎉')
          const prefix = guildDB.prefix || 'rr!';
    
    
    
       let properUsage = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`__**Proper Usage**__\n\n\`1-\` ${prefix}rrdm on\n\`2-\` ${prefix}rrdm off`)
    
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
       .setColor(client.color.red)
     )
            guild.updateOne({
              reactionDM: false
            })
            .catch(err => console.error(err));
    
    message.channel.send(new MessageEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${success} Reaction Role DMs have been disabled!`)
       .setColor(client.color.red)
     )
        })
          } else if (args.includes('enable') || args.includes('on')) {
    
    
         await Guild.findOne({
            guildId: message.guild.id
        }, async (err, guild) => {
    
     if(guild.reactionDM === true) return message.channel.send(new MessageEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${fail} DMs are already enabled`)
       .setColor(client.color.red))
            guild.updateOne({
              reactionDM: true
            })
            .catch(err => console.error(err));
    
     
    message.channel.send(new MessageEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${success} Reaction Role DMs have been enabled!`)
       .setColor(client.color.red)
     )
    
       })
    
        } else if(args[0]) {
         message.channel.send(properUsage) 
        } else {
     message.channel.send(properUsage) 
    
        }
    
    
        }
    };

    