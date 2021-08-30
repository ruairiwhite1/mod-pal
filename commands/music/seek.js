const Discord = require('discord.js')

module.exports = {
    commands: ['seek'],
    category: 'Music',
    description: 'Seek to a certain part in the music',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        client.distube.seek(message, Number(args[0]))
        message.channel.send('Now seeking...')
    }
}