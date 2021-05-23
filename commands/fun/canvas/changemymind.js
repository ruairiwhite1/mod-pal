const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('@schemas/guilds');
const discord = require('discord.js');
module.exports = {
        name: 'changemymind',
        aliases: ['chmm'],
        description: 'Sends a changemymind Text!',
        category: 'Image',
        expectedArgs: '<text>',
        cooldown: '5s',
        callback: async ({ message, args, text, client, prefix, instance }) => {

            const guildDB = await Guild.findOne({
              guildId: message.guild.id
            });
          
            const language = require(`@util/language/english.json`)
            
            try {
              let text = args.slice(0).join(" ")
          if(!text) return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`☹️ ${language.changeErrorValid}`));
          
           
          if(text.length > 85)  return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`☹️ ${language.changeErrorCharacter}`));
        
          let msg = await message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.generating))
         
              const data = await fetch(
                  `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
                ).then((res) => res.json());
                msg.delete({timeout: 500})
                message.channel.send(new discord.MessageEmbed().setColor('BLUE').setImage(data.message))
            
            } catch (err) {
              console.log(`${err}, command name: changemymind`)
              message.channel.send(language.changeError)
            }
          
          
              }
      }

     
