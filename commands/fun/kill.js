const fetch = require('node-fetch');
const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');
module.exports = {
        commands: 'kill',
        category: 'Fun',
        description: 'Kill someone!',
        callback: async ({ message, args, text, client, prefix, instance }) => {

            const guildDB = await Guild.findOne({
                guildId: message.guild.id
              });
            
              const language = require(`@util/language/english.json`)
            
            
            
            if (!args[0]) return message.channel.send(`${language.kill1}`).catch(() => {
                message.channel.send(`${language.kill1}`)
            });
    
                let userr = message.guild.member(message.mentions.users.first());
                if(!userr) return message.channel.send(`${language.kill1}`)
                let user = userr.user.username;
         
    
                const answers = [
              `${message.author.username} ${language.kill3} ${user}${language.kill4}`,
              `${user} ${language.kill5}`,
              `${user} ${language.kill6}`,
              `${user} ${language.kill7}`,
              `..Noo, ${message.author.username} ${language.kill8} ${user} ${language.kill9}`,
              `${user} ${language.kill10} ${message.author.username}${language.kill11}  `,
              `${user} ${language.kill12}`,
              `${user} ${language.kill13} ${message.author.username} ${language.kill14}`,
              `${user} ${language.kill15}`,
              `${message.author.username} ${language.kill16} ${user}${language.kill17}`,
              `${user} ${language.kill18}`,
              `${user} ${language.kill19}`,
              `${user} ${language.kill20}`,
              `${message.author.username} ${language.kill21} ${user} ${language.kill22}`,
              `${message.author.username} ${language.kill23} ${user}.. rip`,
              `${user} ${language.kill24}`,
              `${language.kill25} ${user}${language.kill26}`,
              `${language.kill27}  ${user}.. rip }`,
              `${message.author.username} crushes ${user} ${language.kill28}`,
              `${user} ${language.kill29}`,
              `${language.kill31} ${message.author.username}, ${user} ${language.kill30}`,
              `${user} ${language.kill32} `,
              `${user} ${language.kill33} `,
             
            ];
                
                 
                  if (userr.id === message.author.id) return message.channel.send(`${language.kill2}`).catch(() => {
                    message.channel.send(`${language.kill1}`)
                });
              
               
              message.channel.send(`${answers[Math.floor(Math.random() * answers.length)]}`).catch(() => {
                  message.channel.send(`${language.kill1}`)
              });
    
            
    
        }
    };

    