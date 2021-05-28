const { MessageEmbed } = require('discord.js');
const Guild = require("@schemas/guilds.js");
const Economy = require("@features/economy.js")
const mongoose = require("mongoose")
const ms = require("ms")
const muteModel = require("@util/mute.js")
const Discord = require("discord.js");
const Logging = require('@schemas/logging.js')
module.exports = {
        name: 'unmute',
        aliases: [ 'unm','um' ],
        description: 'UnMute the specified user from the guild',
        category: 'Moderation',
        expectedArgs: '<user> [reason]',
        permissions: ['MANAGE_ROLES'],
        callback: async ({ message, args, text, client, prefix, instance }) => {
        const settings = await Guild.findOne({
            guildId: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                  _id: mongoose.Types.ObjectId(),
                  guildId: message.guild.id,
                  guildName: message.guild.name,
                  prefix: client.config.prefix,
                  language: "english"
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });
  
  const guildDB = await Guild.findOne({
    guildId: message.guild.id
  });
  const language = require(`@util/language/${guildDB.language}.json`)
    const logging = await Logging.findOne({ guildId: message.guild.id })
  const mentionedMember = message.mentions.members.last()
  || message.guild.members.cache.get(args[0])

const muteRole = message.guild.roles.cache.find(r => r.name == 'Muted')

 if (!mentionedMember) {
  return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`☹️ | ${language.unmuteNoUser}`)
      .setColor('RED'))
}
else if (!muteRole) {
  return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`☹️ | ${language.unmuteNoMutedRole}`)
      .setColor('RED'))
}

const muteDoc = await muteModel.findOne({
  guildID: message.guild.id,
  memberID: mentionedMember.user.id,
})

if (!muteDoc) {
  return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`☹️ | ${language.unmuteNotMuted}`)
      .setColor('RED'))
}
else if (mentionedMember.roles.highest.potision >= message.guild.me.roles.highest.potision) {
  return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`☹️ | ${language.unmuteUserRoleHigher}`)
      .setColor('RED'))
}
else if (muteRole.potision >= message.guild.me.roles.highest.potision) {
  return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`☹️ | ${language.unmuteRolePosition}`)
      .setColor('RED'))
}

mentionedMember.roles.remove(muteRole.id, [`UnMute Command / Responsible User: ${message.author.tag}`]).catch(()=>{})

/*for (const role of muteDoc.memberRoles) {
  mentionedMember.roles.add(role).catch(err => console.log(err))
}*/
let delaynumber = 2000;
  if(muteDoc.memberRoles.length > 10) delaynumber = 4000;
  if(muteDoc.memberRoles.length > 20) delaynumber = 8000;
  if(muteDoc.memberRoles.length > 30) delaynumber = 10000;
  if(muteDoc.memberRoles.length > 40) delaynumber = 12000;
  
    if(logging && logging.moderation.remove_roles === "true"){
    for (const role of muteDoc.memberRoles) {
 const roleM = await message.guild.roles.cache.get(role);
if(roleM){
 await mentionedMember.roles.add(roleM, [`Unmute Command / Responsible user: ${message.author.tag}`]).catch(()=>{})
 
 await delay(delaynumber);
}
 
    }
    }

await muteDoc.deleteOne()

const reason = args.slice(1).join(' ') || language.unbanNoReason

    message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`🎉 | Unmuted **${mentionedMember.user.tag}** ${logging && logging.moderation.include_reason === "true" ?`\n\n**Reason:** ${reason}`:``}`)).then(async(s)=>{
          if(logging && logging.moderation.delete_reply === "true"){
            setTimeout(()=>{
            s.delete().catch(()=>{})
            }, 5000)
          }
        })
        .catch(()=>{});

  if(logging){
  if(logging.moderation.delete_after_executed === "true"){
  message.delete().catch(()=>{})
}

const role = message.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = message.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){
    if(message.channel.id !== logging.moderation.ignore_channel){
  if(!role || role && !message.member.roles.cache.find(r => r.name.toLowerCase() === role.name)){

if(logging.moderation.mute == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = 'GREEN';

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbed = new MessageEmbed()
.setAuthor(`Action: \`UnMute\` | ${mentionedMember.user.tag} | Case #${logcase}`, mentionedMember.user.displayAvatarURL({ format: 'png' }))
.addField('User', mentionedMember, true)
.addField('Moderator', message.member, true)
.setFooter(`ID: ${mentionedMember.id}`)
.setTimestamp()
.setColor('GREEN')

channel.send(logEmbed).catch(()=>{})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
      }
    }
    }
  }
}

    function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
}
}