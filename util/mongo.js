const mongoose = require('mongoose')
//const { mongoPath } = require('./config.json')

const mongoPath =
  'mongodb+srv://ModPalOwner:Celtic62@mod-pal-bot.locol.mongodb.net/ModPal?retryWrites=true&w=majority'
module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
