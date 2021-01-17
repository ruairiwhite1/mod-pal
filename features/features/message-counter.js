const mongo = require('@util/mongo')
const messageCountSchema = require('@schemas/message-count-schema')

module.exports = client => {
    client.on('message', async (message) => {
        const { author } = message
        const { id } = author

        await mongo().then( async (mongoose) => {
            try {
                await messageCountSchema.findByIdAndUpdate({
                    _id: id
                }, {
                  $inc: {
                      messageCount: 1
                  },
                },
                {
                    upsert: true
                }
                )
                .exec()
            } finally {
              mongoose.connection.close
            }
        })
    })
}