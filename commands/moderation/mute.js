const { MessageCollector } = require('discord.js')
const muteSchema = require('@schemas/mute-schema')

module.exports = {
    commands: "mute",
    category: 'Moderation',
    description: 'Mute a member for a certain amount of time',
    requiredPermissions: ['KICK_MEMBERS'],
    expectedArgs: '<@user> <time> <m/h/d/life> <reason>',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const durations = {
            m: 60,
            h: 60 * 60,
            d: 60 * 60 * 24,
            life: -1,
          }
        if (args.length !== 4) {
            message.reply('Incorrect syntax! Please use !mute <@user> <time> <reason>')
            return
        }
        
        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify a user to mute!')
            return
        }

        const time = args[1]
        if (isNaN(time)) {
            message.reply('Please specify a valid time!')
            return
        }

        const durationType = args[2]
        if (!durations[durationType]) {
            message.reply('Please specify a valid time frame')
            return
        }

        let reason = args[3]
        if(!reason) reason = 'No provided'

         const currentlyMuted = previousMutes.filter(mute => {
            return mute.content === true
        })

        if (currentlyMuted.length) {
            message.reply('That user is already muted!')
            return
        }

        const expires = new Date()
        expires.setHours(expires.get() + duration)
    }
}