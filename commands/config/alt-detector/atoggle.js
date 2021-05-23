const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require("@features/altdetector.js");

module.exports = {
      name: "atoggle",
      expectedArgs: "<true | false>",
      category: "Alt Detector",
      description: "Disable or Enable the altdetector Module.",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
           guildId: message.guild.id
       });
       const language = require(`@util/language/english.json`)
         
         let choices = ["true", "false"]
         if(!args[0] || !choices.includes(args[0].toLowerCase())) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.aactionNotValidChoice.replace("{allChoices}", choices.join(", "))))
         
         await alt.findOne({ guildID: message.guild.id }, async (err, db) => {
           if(!db){
               let newGuild = new alt({
               guildID: message.guild.id,
               altDays: 7 /*86400000*/,
               altModlog: '',
               allowedAlts: [],
               altAction: 'none',
               altToggle: args[0].toLowerCase(),
               notifier: false,
               })
               
               await newGuild.save()
               
               return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.atoggleSuccess.replace("{choice}", args[0])))
           }
           
           await db.updateOne({
             altToggle: args[0].toLowerCase()
           })
           
                 let choice 
         if(args[0].toLowerCase() === "true"){ 
           choice = "on" 
         }
         else if(args[0].toLowerCase() === "false") { 
           choice = "off" 
         }
           
           return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.atoggleSuccess.replace("{toggle}", choice)))
   
         })
      }
    }
   

