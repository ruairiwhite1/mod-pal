const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const app = require("@models/application/application.js");

module.exports = {
      name: "apply",
      description: "Apply in the current servers, or answer a few questions",
      cooldown: '5s',
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });
        const language = require(`@util/language/english.json`)
        
        const closed = new discord.MessageEmbed()
        .setDescription(`☹️ | The current guild does not have any form to apply to`)
        .setColor('RED')
    
            const closed2 = new discord.MessageEmbed()
        .setDescription(`☹️ | I could not find the guild's apply Log channel. Please make sure to let an admin know.`)
        .setColor('RED')
    
    
       let db = await app.findOne({
          guildID: message.guild.id
        })
        
          if(!db) {
          let newAppDB = new app({
           guildID: message.guild.id,
           questions: [],
           appToggle: false,
           appLogs: null
          })
        await newAppDB.save().catch((err) => {console.log(err)})
        
        return message.channel.send(closed)
      }
      
    
      if(db.questions.length === 0 || db.questions.length < 1) return message.channel.send(closed) ;
      const channel = await message.guild.channels.cache.get(db.appLogs);
      if(!channel) return message.channel.send(closed);
          await message.author.send(new discord.MessageEmbed().setColor('GREEN').setFooter('Developed by Ruairiw8').setDescription(`🎉 | You can apply to the form in **${message.guild.name}** [by clicking here](https://pogy.xyz/apply/${message.guild.id})`))
          .then(message.channel.send(`Form sent by DMs - ${message.author}`))
          .catch(()=>{
            return message.channel.send(closed2)
            })
    
          
         
        }
    }
  
