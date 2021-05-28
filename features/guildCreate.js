const Discord = require('discord.js');
const logger = require('@util/logger');
const Guild = require('@schemas/guilds');
const metrics = require('datadog-metrics');
const Logging = require('@schemas/logging');
const config = require('@root/config.json');
const welcomeClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);

module.exports = (client) => {
    client.on('guildCreate', async (guild) => {
    logger.info(`Joined to "${guild.name}" (${guild.id})`, { label: 'Guilds' })

    const find = await Guild.findOne({
      guildId: guild.id,
    })

    if(!find){
          const guildConfig = await Guild.create({
      guildId: guild.id,
      language: "english"
    })
    await guildConfig.save().catch(()=>{})
    }
    
    
  var textChats = guild.channels.cache
        .find(ch => ch.type === 'text' && ch.permissionsFor(guild.me).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS']))

const modLog = guild.channels.cache.find(c => c.name.replace('-', '').replace('s', '') === 'modlog' || 
    c.name.replace('-', '').replace('s', '') === 'moderatorlog');

 let muteRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
  if (!muteRole) {
    try {
      muteRole = await guild.roles.create({
        data: {
          name: 'Muted',
          permissions: []
        }
      });
    } catch {
    
    }
    for (const channel of guild.channels.cache.values()) {
      try {
        if (channel.viewable && channel.permissionsFor(guild.me).has('MANAGE_ROLES')) {
          if (channel.type === 'text') 
            await channel.updateOverwrite(muteRole, {
              'SEND_MESSAGES': false,
              'ADD_REACTIONS': false
            });
          else if (channel.type === 'voice' && channel.editable) // 
            await channel.updateOverwrite(muteRole, {
              'SPEAK': false,
              'STREAM': false
            });
        } 
      } catch (err) {
       
      }
    }
  }
  
  const logging = await Logging.findOne({
    guildId: guild.id
  })
  if(!logging){
    const newL = await Logging.create({
      guildId: guild.id
    })
    await newL.save().catch(()=>{})
  }

  const logging2 = await Logging.findOne({
    guildId: guild.id
  })

  if(logging2){
    if(muteRole){
logging2.moderation.mute_role = muteRole.id
    }

    if(modLog){
      logging2.moderation.channel = modLog.id
    }
    await logging2.save().catch(()=>{})
    

  }

    if(textChats){
      const embed = new Discord.MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`Hey there! I'm **Imagination Bot**.\n\nThank you for inviting me to your server as it means a lot to us! You can get started by doing **!help** to see all the amazing features we have!\n\n__**Current News**__\n\`\`\`\nWe are currently trying to become verified! If you would like to help us out with this goal do !invite to add us to more servers!\`\`\`\n\nAgain, thank you for inviting me! (this server is now very cool)\n**- Imagination Bot**`)
      .addField(
        '\u200b', 
        '[Invite](https://discord.com/oauth2/authorize?client_id=787067669161574430&scope=bot&permissions=8589934591) | ' +
        '[Support Server](https://discord.gg/98uHxr66tq) | ' 
      );



      textChats.send(embed).catch(()=>{})
    }


    const welcomeEmbed  = new Discord.MessageEmbed()
    .setColor(`PURPLE`)
    .setTitle('New Server')
    .setThumbnail(`https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png`)
    .setDescription(`Imagination Bot was added to a new Server!`)
    .addField(`Server Name`, `\`${guild.name}\``, true)
    .addField(`Server ID`, `\`${guild.id}\``, true)
    .setFooter(`${client.guilds.cache.size} guilds `,  'https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png');

welcomeClient.send({
   username: 'Imagination Bot',
        avatarURL: 'https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png',
        embeds: [welcomeEmbed],
})

      const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`I have joined the ${guild.name} server.\n\nID: ${guild.id}`)
      .setFooter(`Gained ${guild.members.cache.size - 1} members • I'm now in ${client.guilds.cache.size} servers!`)
      .setThumbnail(guild.iconURL({ dynamic: true }) ? guild.iconURL({ dynamic: true }) : `https://guild-default-icon.herokuapp.com/${encodeURIComponent(guild.nameAcronym)}`)
      .addField('Server Owner', `${guild.owner.user.tag} / ${guild.ownerID}`)
    
      webhookClient.send({
        username: 'Imagination Bot',
        avatarURL: 'https://cdn.discordapp.com/attachments/647398611725975553/847896043235835944/image0.png',
        embeds: [embed],
      });
    
}
)
};