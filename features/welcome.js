const Canvacord = require('canvacord')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('@commands/config/setwelcome')

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    const { guild } = member

    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    const welcomecard = new Canvacord.Welcomer()
    .setAvatar(data.displayAvatarURL({format: 'png', dynamic: true}))
    .setStatus(data.presence.status)
    .setOverlay("#000000")
    .setUsername(data.username)
    .setDiscriminator(data.discriminator)
    .setBackground("COLOR", "#808080")
    .setMemberCount(member.guild.members)
    welcomecard.build()
    .then(data => {
        const atta = new Discord.MessageAttachment(data, "rank.png")
        message.channel.send(atta)
  })
})}