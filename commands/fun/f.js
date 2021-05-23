const discord = require("discord.js");
const fetch = require('node-fetch');
const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');
module.exports = {
        name: 'f',
        description: 'Pay your respect!',
        category: 'Fun',
        callback: async ({ message, args, text, client, prefix, instance }) => {

            const guildDB = await Guild.findOne({
                guildId: message.guild.id
              });
            
              const language = require(`@util/language/english.json`)
    
              
              const target = message.mentions.users.first()
    
    
    
    if (!args[0]) {
        message.delete().catch(() => {});
                  const embed = new discord.MessageEmbed()
                      .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL({ format: 'png' }))
                      .setColor('PURPLE')
                      .setFooter(`${language.f3}`);
                  message.channel.send({ embed }).then(m => m.react('🇫')).catch(() => {});
      
      
              }
              else {
              message.delete().catch(() => {});
                  const embed = new discord.MessageEmbed()
                      .setAuthor('\u2000', message.author.displayAvatarURL({ format: 'png' }))
                      .setColor('PURPLE')
                      .setDescription(`${message.author} ${language.f2} ${target}`)
                      .setFooter(`${language.f3}`);
                  message.channel.send({ embed }).then(m => m.react('🇫')).catch(() => {});
      
              }
      
        }
      }
