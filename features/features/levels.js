const { Guild } = require('discord.js')
const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')
const levelCache = {}

module.exports = (client) => {
  client.on('message', (message) => {
    const { guild, member } = message

    addXP(guild.id, member.id, 23, message)
  })
}

module.exports.getRank = async (guildId, userId) => {
  const cachedValue = levelCache[`${guildId}-${userId}`]
  if (cachedValue) {
      return cachedValue
  }

  return await mongo().then(async mongoose => {
      try {

          const result = await profileSchema.findOne({
              guildId,
              userId
          })

          let level = 0
          if (result) {
              level = result.level
          } else {
              console.log('Inserting a document')
              await new profileSchema({
                  guildId,
                  userId,
                  level
              }) .save()

              levelCache[`${guildId}-${userId}`] = level

          }

          return level
      } finally {
          mongoose.connection.close
      }
  })
}

const getNeededXP = (level) => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            xp: xpToAdd,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      let { xp, level } = result
      const needed = getNeededXP(level)

      if (xp >= needed) {
        ++level
        xp -= needed

        message.reply(
          `You are now level ${level} with ${xp} experience! You now need ${getNeededXP(
            level
          )} XP to level up again.`
        )

        await profileSchema.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        )
      }
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.addXP = addXP