const chatbotSchema = require('@schemas/chatbot-schema')

const cache = new Map()

const loadData = async () => {
  const results = await chatbotSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  callback: async ({ message, args, text, client, prefix, instance }) => {
    const { guild, channel } = message

    await chatbotSchema.findOneAndUpdate(
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

    message.reply('Chatbot channel set!')
  },
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}