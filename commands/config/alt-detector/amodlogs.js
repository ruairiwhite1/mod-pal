const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require("@features/altdetector.js");

module.exports = {
      name: "amodlog",
      expectedArgs: "<channel>",
      category: "Alt Detector",
      description: "Set the channel in which logs will be sent.",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });
        const language = require(`@util/language/english.json`)

      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name === args[0]) || message.guild.channels.cache.get(args[0])
      if(!channel) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.amodlogNotValidChannel))
      
      await alt.findOne({ guildID: message.guild.id }, async (err, db) => {
          if(!db) {
                let newGuild = new alt({
                guildID: message.guild.id,
                altDays: 7,
                altModlog: channel.id,
                allowedAlts: [],
                altAction: 'none',
                altToggle: false,
                notifier: false,
                })
                
                await newGuild.save()
                
                return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.amodlogSuccess.replace("{modLog}", "#" + channel.name)))
          }
          
          await db.updateOne({
            altModlog: channel.id
          })
          
        return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.amodlogSuccess.replace("{modLog}", "#" + channel.name)))
          
      })
      }
    }
  
