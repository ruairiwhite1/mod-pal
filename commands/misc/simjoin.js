module.exports = {
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({ message, args, text, client, prefix, instance }) => {
      client.emit('guildMemberAdd', message.member)
    },
  }