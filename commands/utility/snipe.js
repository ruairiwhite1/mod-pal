const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')
const Snipe = require('@schemas/snipe')
module.exports = {
        name: 'snipe',
        description: 'Snipe Messages in the channel',
        category: 'Utility',
        cooldown: '5s',
        permission: ["MANAGE_MESSAGES"],
        callback: async ({ message, args, text, client, prefix, instance }) => {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
      

      const language = require(`@util/language/english.json`);
      
let fail = '☹️'
let sucess = '🎉'

let channel = message.mentions.channels.first();
if(!channel) channel = message.channel

const snipe = await Snipe.findOne({ guildId: message.guild.id, channel: channel.id})

const no = new MessageEmbed()
.setAuthor(`#${channel.name} | ${message.guild.name}`, message.guild.iconURL())
        .setFooter(message.guild.name)
        .setTimestamp()
        .setColor('RED')
        .setDescription(`${fail} | Couldn't find any deleted message in **${channel.name}**`)

if(!snipe){
  return message.channel.send(no)
}

if(snipe.message.length < 1){
  return message.channel.send(no)
}

const data = []

      const embed = new MessageEmbed()
        .setAuthor(`#${channel.name} | ${message.guild.name}`, message.guild.iconURL())
        .setFooter(message.guild.name)
        .setTimestamp()
        .setColor('GREEN')

for (let i = 0; snipe.message.length  > i; i++) {
            data.push(`**${i + 1}-**\n**User:** ${await message.client.users.fetch(snipe.tag[i]) || 'Unknown'}\n**Message:** ${snipe.message[i] || 'None'}\n**image:** \`${snipe.image[i] || 'none'}\``)

            embed.addField(`Message ${i + 1}`, `**User:** ${await message.client.users.fetch(snipe.tag[i]) || 'Unknown'}\n**Message:** ${snipe.message[i] || 'None'}\n**image:** \`${snipe.image[i] || 'none'}\``, true)

        };
        
        if(data.length < 1) return message.channel.send(no);

        

        message.channel.send(embed).catch(async(err)=>{
          await snipe.deleteOne().catch(()=>{})
          message.channel.send(`The embed contained a huge field that couldn't fit as this is the reason i failed to send the embed. I have resetted the database as you can try rerunning the command again.`)
        })
    }
};
