
const Discord = require('discord.js')
const discord = require('discord.js')
const questions = require('@schemas/questions')
const questionChannel = require('@schemas/qotdchannel-schema')
const mongo = require('@util/mongo')
const scheduledSchema = require('@schemas/scheduled-schema')
const momentTimezone = require('moment-timezone')
const { getQotdChannelId } = require('@commands/config/qotd/setqotdchannel')
const { init } = require('@discord-player/extractor/lib/ext/Lyrics')

module.exports = {
  init: (client) => {
    const checkForPosts = async () => {
      const query = {
        date: {
          $lte: Date.now(),
        },
      }
      const results = await scheduledSchema.find(query)

      for (const post of results) {
        const {} = post

        var day = new Date();

        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);

        const time = ('08:00')

        const clocktime = ('AM')

        const targetDate = momentTimezone.tz(
          `${nextDay} ${time} ${clocktype}`
        )

        questions.count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count)
          
            // Again query all users but only fetch one offset by our random #
            questions.findOne().skip(random).exec(
              function (err, question) {

                client.channels.get('865562427408384010').send(question.question)
              })
            })

              await new scheduledSchema({
                date: targetDate.vauleOf(),
              }).save
          }

      await scheduledSchema.deleteMany(query)

      setTimeout(checkForPosts, 1000 * 10)
    }

    checkForPosts()
  },
  callback: ({ message, args }) => {

  } 
    }
