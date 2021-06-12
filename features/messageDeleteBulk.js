const discord = require("discord.js");
const config = require('@root/config.json');
const { MessageEmbed } = require('discord.js');
const logger = require('@util/logger');
const mongoose = require('mongoose');
const Guild = require('@schemas/guilds');
const User = require('@schemas/user');
const metrics = require('datadog-metrics');
require("moment-duration-format");
const Db = require("@models/schema.js");
const reactionTicket = require("@schemas/tickets.js");
const Logging = require('@schemas/logging');
module.exports = async (client) => {
    client.on('messageDeleteBulk', async (message, messages) => {

const logging = await Logging.findOne({ guildId: message.guild.id });

if(logging){
  if(logging.message_events.toggle == "true"){


const channelEmbed = await message.guild.channels.cache.get(logging.message_events.channel)

if(channelEmbed){

let color = logging.message_events.color;
if(color == "#000000") color = this.client.color.red;


  if(logging.message_events.deleted == "true"){


     const embed = new MessageEmbed()
    .setAuthor(`Messages Cleared`, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setDescription(`**${messages.size} messages** in ${message.channel} were deleted.`)
    .setColor('GREEn')
    .setFooter(`${messages.size} Messages`);

    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send(embed).catch(()=>{})
      }

  }


  }
 }
}





}
    )}
