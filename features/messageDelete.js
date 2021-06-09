const discord = require("discord.js");
const config = require('@root/config.json');
const { MessageEmbed } = require('discord.js');
const logger = require('@util/logger');
const mongoose = require('mongoose');
const Guild = require('@schemas/guilds');
const User = require('@schemas/user');
const metrics = require('datadog-metrics');
require("moment-duration-format");
const Logging = require('@schemas/logging');
const Snipe = require('@schemas/snipe');
module.exports = async (client) => {
    client.on('messageDelete', async (message) => {

if (!message.guild) return;

let snipe = await Snipe.findOne({ guildId: message.guild.id, channel: message.channel.id})


const logging = await Logging.findOne({ guildId: message.guild.id });
 if(message && message.author && !message.author.bot){
if(!snipe){ 

      const snipeSave = new Snipe({
              guildId: message.guild.id,
              channel: message.channel.id
            })

          snipeSave.message.push(message.content || null)
          snipeSave.tag.push(message.author.id)
          snipeSave.image.push(message.attachments.first() ? message.attachments.first().proxyURL : null)

          snipeSave.save().catch(()=>{})
      
          snipe = await Snipe.findOne({ guildId: message.guild.id, channel: message.channel.id})
            

} else {

  if(snipe.message.length > 4){
  
  snipe.message.splice(-5,1);
  snipe.tag.splice(-5,1);
  snipe.image.splice(-5,1);

  snipe.message.push(message.content || null)
  snipe.tag.push(message.author.id)
  snipe.image.push(message.attachments.first() ? message.attachments.first().proxyURL : null)

  } else {

    snipe.message.push(message.content || null)
  snipe.tag.push(message.author.id)
  snipe.image.push(message.attachments.first() ? message.attachments.first().proxyURL : null)

  }

  snipe.save().catch(()=>{})

} 
 }
 if (message.webhookID || (!message.content && message.embeds.length === 0)) return;

  }
    )}
