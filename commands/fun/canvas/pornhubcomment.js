const request = require('request-promise-native');
const Guild = require('@schemas/guilds');
const discord = require('discord.js');
const { Canvas } = require("canvacord");
module.exports = {
        name: 'pornhubcomment',
        aliases: [ 'phcomment', 'phubcomment' ],
        description: 'Make your own HUB text!',
        category: 'Image',
        expectedArgs: '<text>',
        cooldown: '5s',
        callback: async ({ message, args, client, prefix, instance }) => {

            const guildDB = await Guild.findOne({
              guildId: message.guild.id
            });
          
        
            const language = require(`@util/language/english.json`)
      
            let text = args.slice(0).join(" ")
            if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
            
              if(text.length > 50) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.phubErrorCharacter}`));
          
              Canvas.phub({ username: message.author.username, message: text, image: message.author.displayAvatarURL({ format: "png" }) })
                .then(attachment => message.channel.send({ files: [{attachment, name: "img.png"}] }))
          }
      }

    
