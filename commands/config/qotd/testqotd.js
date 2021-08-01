const Discord = require('discord.js')
const discord = require('discord.js')
const questions = require('@schemas/questions')
const mongo = require('@util/mongo')
const scheduledSchema = require('@schemas/scheduled-schema')
const momentTimezone = require('moment-timezone')
const { getQotdChannelId } = require('@commands/config/qotd/setqotdchannel')
const { init } = require('@discord-player/extractor/lib/ext/Lyrics')

module.exports = {
  callback: async ({ message, args }) => {
    questions.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        questions.findOne().skip(random).exec(
          function (err, question) {
            const qotdChannelId = (questions.GuildId)
            if (!qotdChannelId) {
              return
            }
        
            const qotdChannel = client.guild.channels.cache.get(qotdChannelId)
            if (!qotdChannel) {
              return
            }
            
            qotdChannel.send(question.question)
          })
      });       
  } 
    }
