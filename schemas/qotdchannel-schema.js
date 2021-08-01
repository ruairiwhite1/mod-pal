const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const qotdChannelSchema = new mongoose.Schema({
  // Guild ID
  GuildId: reqString,
  channelId: reqString,
})

module.exports = mongoose.model('qotd-channel', qotdChannelSchema)