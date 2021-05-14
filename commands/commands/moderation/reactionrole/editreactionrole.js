const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@root/packages/reactionrole/index.js")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
    name: ["editreaction","editreactionrole", "err"],
    description: 'Edit the role which a certain reaction given',
    expectedArgs: '<channel> <messageID> <newRoleID> <emoji>',
    permissions: 'MANAGE_GUILD',
    callback: async (message, args) => {
        let client = message.client
        
           const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
          const fail = ('☹️')
          const success = ('🎉')
        const missingPermEmbed = new MessageEmbed()
        .setAuthor(`Missing User Permissions`, message.author.displayAvatarURL())
        .setDescription(`${fail} The following command the **Administrator** Permission`)
        .setColor(client.color.red)
        
        
           let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(ch => ch.name === args[0])
        if (!channel) return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`${fail} Provide me with a valid Channel`)
        .setColor(client.color.red)
        );
        
        let ID = args[1]
        if(!ID) return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`${fail} Provide me with a valid message ID`)
        );
        let messageID = await channel.messages.fetch(ID).catch(() => { return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`${fail} I could not find the following ID`)
        .setColor(client.color.red)
        ); })
        
        
           let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(rl => rl.name === args[2])
        if (!role) return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`${fail} Provide me with a valid Role`)
        .setColor(client.color.red)
        );
        
            if(role.managed){
          return message.channel.send(`${message.client.emoji.fail} Please do not use a integration role.`)
        }
        
          
         let emoji = message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === args[3].toLowerCase());
        
        
        
        await react.reactionEdit(client, message.guild.id , ID, role.id, emoji);
        
                    message.channel.send(new MessageEmbed()
                    .setAuthor('Reaction Roles Edit', message.guild.iconURL(),messageID.url)
                    .setColor(client.color.green)
                    .addField('Channel', channel, true)
                    .addField('Emoji', emoji, true)
                    .addField('Type', option, true)
                    .addField('Message ID', ID, true)
                    .addField('Message', `[Jump To Message](${messageID.url})`, true)
                    .addField('Role', role, true)
                    )
        
        
            function isCustomEmoji(emoji) {
          return emoji.split(":").length == 1 ? false : true;
        }
        
        }
        };

