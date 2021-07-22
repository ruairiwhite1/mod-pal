const qotdChannelSchema = require('@schemas/qotdchannel-schema')

const cache = new Map()

const loadData = async () => {
  const results = await qotdChannelSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports = {
    description: 'Set the channel where daily qotds will be posted.',
    requiredPermissions: ['ADMINISTRATOR'],
  callback: async ({ message, args, text, client, prefix, instance }) => {
    const { guild, channel } = message

    await qotdChannelSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    )

    cache.set(guild.id, channel.id)

    message.reply('QOTD channel set!')
  },
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}