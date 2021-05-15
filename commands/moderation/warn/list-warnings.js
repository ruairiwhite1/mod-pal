const mongo = require('@util/mongo')
const warnSchema = require('@schemas/warn-schema')

module.exports = {
  commands: ['listwarnings', 'lw'],
  requiredPermissions: ['KICK_MEMBERS'],
  minArgs: 1,
  category: 'Moderation',
  expectedArgs: "<Target user's @>",
  requiredRoles: ['Staff'],
  callback: async ({ message, args, text, client, prefix, instance }) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.channel.send('Please specify a user to load the warnings for.')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        })

        let reply = `Previous warnings for <@${userId}>:\n\n`

        for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning

          reply += `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}"\n\n`
        }

        message.channel.send(reply)
      } finally {
        mongoose.connection.close()
      }
    })
  },
}
