const fetch = require('node-fetch');
const Guild = require('@schemas/guilds');
const discord = require('discord.js');
const request = require('request-promise-native');


module.exports = {
        name: 'impostor',
        description: 'Be an impostor',
        category: 'Image',
        expectedArgs: '<text>',
        cooldown: '5s',
        callback: async ({ message, args, client, prefix, instance }) => {

            const guildDB = await Guild.findOne({
              guildId: message.guild.id
            });
          
        
            const language = require(`@util/language/english.json`)
      
            try {
              let text = args.slice(0).join(" ")
              if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));
              if(text.length > 40) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.floorError}`));
              //https://vacefron.nl/api/ejected?name=[MESSAGE]&imposter=true&crewmate=red
              let options = {
                url: 'https://vacefron.nl/api/ejected',
                qs: {
                  name: args.join(' ').split('').join(''),
                  imposter: true,
                  crewmate: 'red'
                },
                encoding: null
              };
            
              let response = await request(options);
            
              await message.channel.send({
                files: [ response ]
              });
            } catch(error) {
              this.client.emit("apiError", error, message);
            }
          }
      }

    
