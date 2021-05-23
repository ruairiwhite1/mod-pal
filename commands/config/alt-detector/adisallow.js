const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require("@features/altdetector.js");

module.exports = {
      name: "adisallow",
      expectedArgs: "<userID>",
      category: "Alt Detector",
      description: "Remove an alt account off the whitelist.",
      cooldown: '5s',
      permission: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
           guildId: message.guild.id
       });
       const language = require(`@util/language/english.json`)
       
       await alt.findOne({ guildID: message.guild.id }, async(err, db) => {
         if(!db) {
               let newGuild = new alt({
               guildID: message.guild.id,
               altDays: 7 ,
               altModlog: '',
               allowedAlts: [],
               altAction: 'none',
               altToggle: false,
               notifier: false,
               })
               
               await newGuild.save()
               
               return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.adisallowNotInArray))
         }
         if(!args[0]) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.adisallowNotInArray))
   
         if(!db.allowedAlts.includes(args[0])) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.adisallowNotInArray))
         
         let arr = db.allowedAlts
         let newArr = removeA(arr, args[0])
         
         await db.updateOne({
           allowedAlts: newArr
         })
         
         message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.adisallowSucess))
   
   function removeA(arr) {
       var what, a = arguments, L = a.length, ax;
       while (L > 1 && arr.length) {
           what = a[--L];
           while ((ax= arr.indexOf(what)) !== -1) {
               arr.splice(ax, 1);
           }
       }
       return arr;
   }
       })
    }
}
