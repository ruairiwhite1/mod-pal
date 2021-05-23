const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require("@features/altdetector.js");

module.exports = {
      name: "asetdays",
      aliases: ["asd"],
      category: "Alt Detector",
      expectedArgs: "<days>",
      description: "Set the amount of days of the alt age.",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
          guildId: message.guild.id
      });
        const language = require(`@util/language/english.json`)
  
        let days = args[0]
        if(!days) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.setdaysInvalidArg))
        if(isNaN(days)) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.setdaysInvalidArg))
     
      let day = Number(days)
      
      if(day > 100) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`${message.client.emoji.fail} Please do not exceed the length of 100 days.`));
  
  
      await alt.findOne({
        guildID: message.guild.id
      }, async (err, db) => {
        if(!db) {
              let newGuild = new alt({
              guildID: message.guild.id,
              altDays: days,
              altModlog: '',
              allowedAlts: [],
              altAction: 'none',
              altToggle: false,
              notifier: false,
              })
              
              await newGuild.save()
              .catch(err => { console.log( err ) })
              
              return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.setdaysSuccess))
  
        }
        
        await db.updateOne({
          altDays: day,
        })
        
        message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.setdaysSuccess))
      })
    }
  }
