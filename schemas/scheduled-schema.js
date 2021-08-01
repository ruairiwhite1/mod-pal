const mongoose = require('mongoose')

const scheduledSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
})

const name = 'scheduled-qotd'

module.exports = mongoose.model[name] || mongoose.model(name, scheduledSchema, name)