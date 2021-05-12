const discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
        commands: 'simprate',
        description: 'See how simp you are',
        expectedArgs: '[user]',
        callback:     async (message, args) => {
      
            function randomInteger(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max)
              return Math.floor(Math.random() * (max - min +1)) + min
            }
              const target = message.mentions.users.first()
              const authorId = message.author.id
            
              let amount = randomInteger(1,100)
              let text = message.mentions.members.first()
              let embedd = new discord.MessageEmbed()
              .setColor('LUMINOUS_VIVID_PINK')
              .setTitle(`simpmachine`)
              .setDescription(`You are **${amount}%** simp`)
            
              if (target === authorId){
              
               message.channel.send(embedd)}
              if(!target)return message.channel.send(embedd) 
              let targett = target.username
               let embed = new discord.MessageEmbed()
              .setColor('LUMINOUS_VIVID_PINK')
              .setTitle(`simpmachine`)
              .setDescription(`${targett} ${simpIs} **${amount}%** simp`)
               message.channel.send(embed)
             
               
            
                    }
      }
