const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")

module.exports = {
        commands: ['setlanguage', 'setlang', 'lang'],
        description: 'Set a guild language',
        permissions: 'MANAGE_GUILD',
        callback: async (message, args) => {
            const guildDB = await Guild.findOne({
                guildId: message.guild.id
            });
    
    
              const language = require(`@util/language/${guildDB.language}.json`)
              
    
              
              let languages = ["english", "french", "spanish"]
              
              if(!args[0]) return message.channel.send(new discord.MessageEmbed().setColor(message.client.color.red).setDescription(`${message.client.emoji.fail} | ${language.setLangMissingArgument}`))
              
              
              let setLangInvalidOption = language.setLangInvalidOption.replace("{languages}", languages.join(", "))
              if(!languages.includes(args[0].toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor(message.client.color.red).setDescription(`${message.client.emoji.fail} | ${setLangInvalidOption}`))
              
              let setLangChange = language.setLangChange.replace("{language}", args[0].toLowerCase())
              message.channel.send(new discord.MessageEmbed().setColor(message.client.color.green).setDescription(`${message.client.emoji.success} | ${setLangChange}`))
              
              await guildDB.updateOne({
                        language: args[0].toLowerCase()
                    });
            }
        }        


    