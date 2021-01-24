const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['av', 'avatar'],
    callback: async (message) => {
        const avatar = message.mentions.users.first()
        const embed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
        .setColor('RANDOM')
        .setTitle(`**Here's the avatar of ${message.member.displayName}!**`)
        .setImage(message.author.displayAvatarURL({dynamic: true, format: 'png', size: 512}))
        .setTimestamp()
          if(!avatar) return message.channel.send(embed) 
          else if(avatar) {
          const embed2 = new MessageEmbed()
            .setAuthor(message.member.displayName, message.member.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTitle(`**Here's the avatar of ${avatar.username}!**`)
            .setImage(avatar.displayAvatarURL({dynamic: true, format: 'png', size: 512}))
            .setTimestamp() 
          message.channel.send(embed2)
        }
    }
}