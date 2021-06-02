const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@util/reactionrole")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
        name: 'removerr',
        aliases: ["removereactionrole", "rreactionrole", "deletereactionrole", "delreactionrole", "remrr", "delrr", 'delreaction', 'deletereaction'],
        description: 'Delete a reaction role',
        category: 'Reaction Role',
        cooldown: '3s',
        expectedArgs: '<channel> <messageID> <emoji>',
        permissions: ['MANAGE_GUILD'],
        callback: async ({ message, args, text, client, prefix, instance }) => {


       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

      
    
      let fail = '☹️'
      let success = '🎉'
  const missingPermEmbed = new MessageEmbed()
  .setAuthor(`Missing User Permissions`, message.author.displayAvatarURL())
  .setDescription(`${fail} The following command requires the **Administrator** Permission`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')

      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(ch => ch.name === args[0])
    if (!channel) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Channel`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')
    );
    
    let ID = args[1]
    if(!ID) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid message ID`)
  .setFooter(`Developed by Ruairiw8`)
    );
    let messageID = await channel.messages.fetch(ID).catch(() => { return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} I could not find the following ID`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')
    ); })

           let emoji = args[2]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Emoji`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')
    );

  
    
    if (isCustomEmoji(args[2])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Do Not use custom Emojis!`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')
    );
    
   

    await react.reactionDelete(client, message.guild.id , ID, emoji);
    
     message.channel.send(new MessageEmbed()
   .setColor('GREEN')
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Deleted The [Reaction Role](${messageID.url})`)
  .setFooter(`Developed by Ruairiw8`))
  


        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    
    }
};