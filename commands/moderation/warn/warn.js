const mongo = require('@util/mongo')
const warnSchema = require('@schemas/warn-schema')

module.exports = {
  commands: 'warn',
  minArgs: 2,
  category: 'Moderation',
  requiredPermissions: ['KICK_MEMBERS'],
  expectedArgs: "<Target user's @> <reason>",
  callback: async ({ message, args, text, client, prefix, instance }) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.channel.send('Please specify someone to warn.')
      return
    }

    args.shift()

    const guildId = message.guild.id
    const userId = target.id
    const reason = args.join(' ')

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    }

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        )
      } finally {
        mongoose.connection.close()
      }
    })
  },
}