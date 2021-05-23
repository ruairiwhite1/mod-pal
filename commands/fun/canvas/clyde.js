const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('@schemas/guilds');
const discord = require('discord.js');
module.exports = {
        name: 'clyde',
        description: 'Sends a clyde message!',
        category: 'Image',
        expectedArgs: '<text>',
        cooldown: '5s',
        callback: async ({ message, args, client, prefix, instance }) => {

            const guildDB = await Guild.findOne({
              guildId: message.guild.id
            });
          
            const language = require(`@util/language/english.json`)
      
           
      let text = args.slice(0).join(" ")
      if(!text) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`☹️ ${language.changeErrorValid}`));
      
        if(text.length > 60) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`☹️ ${language.clydeError}`));
      
      try {
      let msg = await message.channel.send(language.generating);
      
      
      const data = await fetch(
          `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
        ).then((res) => res.json());
        msg.delete({timeout: 500})
        message.channel.send(new discord.MessageEmbed().setColor('BLUE').setImage(data.message))
      
        
        } catch (err) {
          console.log(`${err}, command name: clyde`)
          message.channel.send(language.clydeError)
        }
      
          
              }
    }
  