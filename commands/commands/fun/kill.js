const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
        commands: 'kill',
        description: 'Kill someone! !',
        callback: async (message, args) => {

            if (!args[0]) return message.channel.send(`${kill1}`).catch(() => {
                message.channel.send(`${kill1}`)
            });
    
                let userr = message.guild.member(message.mentions.users.first());
                if(!userr) return message.channel.send(`${kill1}`)
                let user = userr.user.username;
         
    
                const answers = [
              `${message.author.username} ${kill3} ${user}${kill4}`,
              `${user} ${kill5}`,
              `${user} ${kill6}`,
              `${user} ${kill7}`,
              `..Noo, ${message.author.username} ${kill8} ${user} ${kill9}`,
              `${user} ${kill10} ${message.author.username}${kill11}  `,
              `${user} ${kill12}`,
              `${user} ${kill13} ${message.author.username} ${kill14}`,
              `${user} ${kill15}`,
              `${message.author.username} ${kill16} ${user}${kill17}`,
              `${user} ${kill18}`,
              `${user} ${kill19}`,
              `${user} ${kill20}`,
              `${message.author.username} ${kill21} ${user} ${kill22}`,
              `${message.author.username} ${kill23} ${user}.. rip`,
              `${user} ${kill24}`,
              `${kill25} ${user}${kill26}`,
              `${kill27}  ${user}.. rip }`,
              `${message.author.username} crushes ${user} ${kill28}`,
              `${user} ${kill29}`,
              `${kill31} ${message.author.username}, ${user} ${kill30}`,
              `${user} ${kill32} `,
              `${user} ${kill33} `,
             
            ];
                
                 
                  if (userr.id === message.author.id) return message.channel.send(`${kill2}`).catch(() => {
                    message.channel.send(`${kill1}`)
                });
              
               
              message.channel.send(`${answers[Math.floor(Math.random() * answers.length)]}`).catch(() => {
                  message.channel.send(`${kill1}`)
              });
    
            
    
        }
    };
    
    