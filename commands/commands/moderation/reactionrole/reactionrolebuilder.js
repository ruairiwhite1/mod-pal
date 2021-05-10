const Guild = require('@schemas/guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@root/packages/reactionrole/reaction.js")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
    commands: ["builder","rrb", "reactionrolebuilder", "reactionbuilder", "rolebuilder", "rrbuilder"],
    description: 'Start a prompt and create your reaction role',
    permissions: 'MANAGE_GUILD',
    callback: async (message, args) => {
        let client = message.client
    
           const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
    
          
          const fail = ('☹️')
          const success = ('🎉')
      const missingPermEmbed = new MessageEmbed()
      .setAuthor(`Missing User Permissions`, message.author.displayAvatarURL())
      .setDescription(`${fail} The following command the **Administrator** Permission`)
    
    
     
      const cancelledEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${success} Reaction Builder Cancelled!`)
    
      const cancelledEmbed2 = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${fail} Wrong Response, Reaction Builder Cancelled!`)
    
        const timeEnd = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${fail} Time has Ended, Reaction Builder Cancelled!`)
    const filter = m => m.author.id === message.author.id
    
    message.channel.send("Please specify a channel! **[channel / ID]**\n\n**Type Cancel to cancel**").then(() => {
      message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(async collected => {
        let channel = collected.first().content
        let channelMention = collected.first().mentions
        let channelToSend = channelMention.channels.first() || message.guild.channels.cache.get(channel.toLowerCase()) || message.guild.channels.cache.find(ch => ch.name === channel.toLowerCase())
    
        if(channel.toLowerCase() === 'cancel'){
          message.channel.send(cancelledEmbed)
          return;
        }
       
        if(!channelToSend) return message.channel.send(cancelledEmbed2)
        
        message.channel.send(`Provide me with a message ID\n\nMake sure the message is in ${channelToSend}\n\n**Type Cancel to Cancel**`).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(async collected1 => {
            let ID = collected1.first().content
                if(ID.toLowerCase() === 'cancel'){
          message.channel.send(cancelledEmbed)
          return;
        }
            let messageID = await channelToSend.messages.fetch(ID).catch(() => { return message.channel.send(cancelledEmbed2) })
              
              message.channel.send("Please provide me with a role **[Role / ID]**\n\nThe following Role will be given when the user reacts!\n\n**Type Cancel to cancel**").then(() => {
                message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(collected2 => {
                  let roleName = collected2.first().content
                  let roleMention = collected2.first().mentions
                  let role = roleMention.roles.first() || message.guild.roles.cache.find(rl => rl.name === roleName) || message.guild.roles.cache.get(roleName)
                      if(roleName.toLowerCase() === 'cancel'){
          message.channel.send(cancelledEmbed)
          return;
        }
                  if(!role) return message.channel.send(cancelledEmbed2)
                      if(role.managed){
          return message.channel.send(`${message.client.emoji.fail} Please do not use a integration role.`)
        }
                  //wtf
                  
                  message.channel.send("Now Please Provide me with an Emoji, make sure its not a custom One!\n\nThe Following Emoji will be the emoji that the user will react to!\n\n**Type Cancel to cancel**").then(() => {
                message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(async (collected3) => {
                  let emoji = collected3.first().content
    
                 
                  
        if (!emoji) return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${fail} Provide me with a valid Emoji`)
       .setColor(client.color.red)
        );
    
    
        if (isCustomEmoji(emoji)) return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${fail} Do Not use custom Emojis!`)
       .setColor(client.color.red)
        );
    
    try {
    
    await messageID.react(emoji)
    
    } catch(err){
     return message.channel.send(new MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`${fail} Please Provide a valid Emoji.`)
      .setColor(client.color.red));
    }
                  
                  message.channel.send("__**Finally Pick:**__\n\n`A` - React adds the role, unreacting removes the role\n`B`- Reacting will give the role but unreaction won't remove the role\n`C` - Reacting will remove the user's role and unreacting won't give it back\n`D` - When reacting it will remove the role, unreacting will add the role\n`E` - Same concept as number 3 but removes the user's reaction\n`F` - React to recieve the role and react again to remove the role").then(() => {
                  message.channel.awaitMessages(filter, { max: 1, time: 150000, errors: ["time"] }).then(collected4 => {
                    let option = collected4.first().content
                    let numbers = ["A", "B", "C", "D", "E", "F"]
                    if(!numbers.includes(option)) return message.channel.send("You must specify between 1, 2, 3, 4 or 5")
                    
                    message.channel.send(new MessageEmbed()
                    .setAuthor('Reaction Roles - Setup Done', message.guild.iconURL(),messageID.url)
                    .setColor(client.color.green)
                    .addField('Channel', channelToSend, true)
                    .addField('Emoji', emoji, true)
                    .addField('Type', option, true)
                    .addField('Message ID', ID, true)
                    .addField('Message', `[Jump To Message](${messageID.url})`, true)
                    .addField('Role', role, true)
                    ).then(async () => {
                      messageID.react(emoji)
                      
                       await react.reactionCreate(client, message.guild.id , ID, role.id, emoji, "false", option);//ID is MessageID, ignore "false"
    
                    })
                   }).catch(err => { message.channel.send(timeEnd) })
                  })
                   }).catch(err => { message.channel.send(timeEnd) })
                  })
               }).catch(err => { message.channel.send(timeEnd) })
              })
         }).catch(err => { message.channel.send(timeEnd) 
         console.log(err)})
        })
      }).catch(err => { message.channel.send(timeEnd) })
    })
    
            function isCustomEmoji(emoji) {
          return emoji.split(":").length == 1 ? false : true;
        }
        }
    }
    