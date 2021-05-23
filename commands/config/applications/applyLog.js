const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const app = require("@models/application/application.js");
const MessageEmbed = require("discord.js")

module.exports = {
      name: "applylog",
      aliases: ["applychannel", "applylogs"],
      expectedArgs: "enable #channel | disable",
      description: "Set's the guild's apply Logs",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });
        const language = require(`@util/language/english.json`)
        
      
     if (args.length < 1) {
            return message.channel.send( new discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`☹️ | Correct usage **enable #channel** | disable`));
          }
    
          if (args.includes('disable')) {
            await app.findOne({
              guildID: message.guild.id
          }, async (err, guild) => {
              guild.updateOne({
               appLogs: null
              })
              .catch(err => console.error(err));
      
              return message.channel.send( new discord.MessageEmbed()
              .setColor('RED')
              .setDescription(`☹️ | Disabled the form Module!`)); 
            });
            return;
          }
    
          const channel = await message.mentions.channels.first();
    
          if (!channel)  return message.channel.send( new MessageEmbed()
          .setColor('RED')
          .setDescription(`☹️ Please provide a valid Channel`));
        
          await app.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            guild.updateOne({
              appLogs: channel.id
            })
            .catch(err => console.error(err));
    
            return message.channel.send( new discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`🎉 Set the application log channel to ${channel}`)); 
          });
         
        }
    }
  
  