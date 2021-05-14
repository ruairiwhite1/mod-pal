const mongo = require('@util/mongo')
const commandPrefixSchema = require('@schemas/command-prefix-schema')

module.exports = {
    commands: "setprefix",
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<New Prefix>",
    permissionError: "Sorry you must have the **ADMINISTRATOR** permission to run this command",
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments, text) => {
        await mongo().then(async mongoose => {
            try {
                const guildId = message.guild.id
                const prefix = arguments[0]

                await commandPrefixSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    prefix: prefix
                }, {
                    upsert: true
                })

                message.reply(`Bot prefix has been updated to ${prefix}`)
            } finally {
                mongoose.connection.close
            }
        })
    }
}