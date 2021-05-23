const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require("@features/altdetector.js");
const cache = new Map()

module.exports = {
      name: "aaction",
      expectedArgs: "<ban | kick | none>",
      category: "Alt Detector",
      description: "Pick the action fired towards the alt.",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback:async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });
        const language = require(`@util/language/english.json`)
        
      
      let choices = ["none", "kick", "ban"]
      if(!args[0]) return message.channel.send(new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`😞 ${language.aactionNotValidChoice.replace("{allChoices}", choices.join(", "))}`).setFooter('Imagination Bot Developed by Ruairiw8').setTimestamp().setColor('RED'));
    
      if(!choices.includes(args[0].toLowerCase())) return message.channel.send(new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`😞 ${language.aactionNotValidChoice.replace("{allChoices}", choices.join(", ") )}`).setFooter('Imagination Bot Developed by Ruairiw8').setTimestamp().setColor('RED'));
      
      await alt.findOne({ guildID: message.guild.id }, async (err, db) => {
                  if(!db) {
                let newGuild = new alt({
                guildID: message.guild.id,
                altDays: 7,
                altModlog: '',
                allowedAlts: [],
                altAction: args[0].toLowerCase(),
                altToggle: false,
                notifier: false,
                })
                
                await newGuild.save()
                .catch(err => { console.log( err ) })
                return message.channel.send(new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`🎉 ${language.aactionSuccess.replace("{action}", args[0])}`).setFooter('Imagination Bot Developed by Ruairiw8').setTimestamp().setColor('RED'));
              }
          await db.updateOne({
            altAction: args[0].toLowerCase()
          })
    
          return message.channel.send(new discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`🎉 ${language.aactionSuccess.replace("{action}", args[0])}`).setFooter('Imagination Bot Developed by Ruairiw8').setTimestamp().setColor('RED'));
        
      })
      }
    }