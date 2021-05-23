const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require('@features/altdetector');
const moment = require('moment')
const ReactionMenu = require('@util/ReactionMenu.js');

module.exports = {
      name: "findalts",
      aliases: ["identifyalt", "findalt", "identifyalts"],
      expectedArgs: "<date>",
      category: "Alt Detector",
      description: "Find all alts in the guild with the provided account age (days)",
      cooldown: '10s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
           guildId: message.guild.id
       });
       const language = require(`@util/language/english.json`)
    
         let days = args[0]
         if(!days) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`☹️ | Please provide a valid Days Duration`))
   
         if(isNaN(days)) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`☹️ | Please provide a valid Days Duration`))
      
       let day = Number(days)
   
       if(day > 100) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`☹️ | You may only find alts of an account age of **100 days** or below`))
   
       let array = []
   
       message.guild.members.cache.forEach(async(user)=>{
   
       let math = day * 86400000
   
       let x = Date.now() - user.user.createdAt;
       let created = Math.floor(x / 86400000);
         
       if(day > created) {
   
       array.push(`${user} (${user.user.tag} | ${user.id})\nCreated At: **${user.user.createdAt}**`)
       }
      
       })
   
       const interval = 10;
   
   
       const embed = new discord.MessageEmbed()
       .setTitle(`Alt Detector - Account age < ${days} Days`)
       .setDescription(array.join("\n\n") || "No alts found")
       .setColor('GREEN')
   
   if (array.length <= interval) {
       
       const range = (array.length == 1) ? '[1]' : `[1 - ${array.length}]`;
         message.channel.send(embed
           .setTitle(`Alt Detector - Account age < ${days} Days`)
           .setDescription(array.join('\n\n'))
         );
   
       } else {
   
         embed
           .setTitle(`Alt Detector - Account age < ${days} Days`)
           .setFooter(message.author.tag,  
             message.author.displayAvatarURL({ dynamic: true })
           );
   
         new ReactionMenu(message.client, message.channel, message.member, embed, array, interval);
       }
   
   
   
      }
   
   
   }
   
