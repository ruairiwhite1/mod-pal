const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['purge', 'clear', 'delmsg', 'delmessage'],
  description: 'Deletes messages',
  expectedArgs: '<2-100>',
  minArgs: 1,
  maxArgs: 1,
  permissions: ['MANAGE_MESSAGES'],
  callback: async (message, args) => {
    message.delete()
    const deleteCount = parseInt(args[0], 10)

    if (isNaN(deleteCount) || deleteCount < 2 || deleteCount > 100)
      return message.reply('please specify 2-100 messages to purge.').then(sentMessage => {
        sentMessage.delete({ timeout: 5000 })
      })

    const fetched = await message.channel.messages.fetch({ limit: deleteCount })

    message.delete()
    message.channel.bulkDelete(fetched)
    const success = new MessageEmbed()
      .setTitle(`Successfully purged ${deleteCount} messages!`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      .setColor('#77dd77')
      .setFooter('Permissions Granted')
      .setTimestamp()

    message.channel.send(success).then(sentMessage => {
      sentMessage.delete({ timeout: 5000 })
    })
  }
}