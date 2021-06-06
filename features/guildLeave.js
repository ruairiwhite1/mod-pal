const Discord = require('discord.js');
const logger = require('@util/logger');
const Guild = require('@schemas/guilds');
const metrics = require('datadog-metrics');
const Logging = require('@schemas/logging');
const config = require('@root/config.json');
const welcomeClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);

module.exports = (client) => {
    client.on('guildDelete', async (guild) => {
    Guild.findOneAndDelete({
      guildId: guild.id,
    }, (err, res) => {
      if (err) console.log(err)
      logger.info(`Left from "${guild.name}" (${guild.id})`, { label: 'Guilds' })
    })

    const welcomeEmbed  = new Discord.MessageEmbed()
   .setColor(`RED`)
    .setTitle('Leave Server')
    .setThumbnail(`https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png`)
    .setDescription(`Imagination Bot left a Server!`)
    .addField(`Server Name`, `\`${guild.name}\``, true)
    .addField(`Server ID`, `\`${guild.id}\``, true)
    .setFooter(`${client.guilds.cache.size} guilds `,  'https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png');

welcomeClient.send({
   username: 'Imagination Bot',
        avatarURL: 'https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png',
        embeds: [welcomeEmbed],
})

Logging.findOneAndDelete({
      guildId: guild.id,
    }).catch(()=>{});

      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`I have left the ${guild.name} server.`)
      .setFooter(`Lost ${guild.members.cache.size - 1} members • I'm now in ${client.guilds.cache.size} servers..\n\nID: ${guild.id}`)
      .setThumbnail(guild.iconURL({ dynamic: true }) ? guild.iconURL({ dynamic: true }) : `https://guild-default-icon.herokuapp.com/${encodeURIComponent(guild.nameAcronym)}`)
      .addField('Server Owner', `${guild.owner} / ${guild.ownerID}`)
    
      webhookClient.send({
        username: 'Imagination Bot',
        avatarURL: 'https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png',
        embeds: [embed],
      });
    
  }
  )
};