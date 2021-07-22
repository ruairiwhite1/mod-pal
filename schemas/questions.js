const mongoose = require('mongoose')

const qotdSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('questions', qotdSchema)