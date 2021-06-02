const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@util/reactionrole")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
        name: 'addreaction',
        aliases: ["reactionrole", "rr", "createrr","crr", "addrr", "arr", "rradd"],
        description: 'Create a reaction role',
        category: 'Reaction Role',
        cooldown: '3s',
        expectedArgs: '<channel> <messageID> <role> <emoji> (option)',
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
  .setFooter(`Devloped by Ruairiw8`)
   .setColor('RED')


      
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(ch => ch.name === args[0])
    if (!channel) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Channel`)
  .setFooter(`Devloped by Ruairiw8`)
   .setColor('RED')
    );
    
    let ID = args[1]
    if(!ID) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid message ID`)
  .setFooter(`Devloped by Ruairiw8`)
    );
    let messageID = await channel.messages.fetch(ID).catch(() => { return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} I could not find the following ID`)
  .setFooter(`Devloped by Ruairiw8`)
   .setColor('RED')
    ); })

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(rl => rl.name === args[2])
    if (!role) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Role`)
  .setFooter(`Devloped by Ruairiw8`)
   .setColor('RED')
    );

    if(role.managed){
      return message.channel.send(`${message.client.emoji.fail} Please do not use a integration role.`)
    }
      
     let emoji = args[3]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Provide me with a valid Emoji`)
  .setFooter(`Devloped by Ruairiw8`)
   .setColor('RED')
    );

    if (isCustomEmoji(args[3])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Do Not use custom Emojis!`)
  .setFooter(`Devloped by Ruairiw8`)
   .setColor('RED')
    );

try {

await messageID.react(emoji)

} catch(err){
 return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Please Provide a valid Emoji.`)
  .setColor('RED')
  .setFooter(`Devloped by Ruairiw8`));
}
 
    
    let option = args[4]
    if(!option) option = 1
    if(isNaN(option)) option = 1
    if(option > 6) option = 1
    
    
    await react.reactionCreate(client, message.guild.id , ID, role.id, emoji, "false", option);
    
                message.channel.send(new MessageEmbed()
                .setAuthor('Reaction Roles', message.guild.iconURL(),messageID.url)
                .setColor('GREEN')
                .addField('Channel', channel, true)
                .addField('Emoji', emoji, true)
                .addField('Type', option, true)
                .addField('Message ID', ID, true)
                .addField('Message', `[Jump To Message](${messageID.url})`, true)
                .addField('Role', role, true)
                .setFooter('Devloped by Ruairiw8'))

        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }

    }
};