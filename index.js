require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('@root/config.json')
const mongo = require('@util/mongo')
const loadCommands = require('./commands/load-commands')
const command = require('@util/command')
const loadFeatures = require('@root/features/load-features')

client.on('ready', async () => {
    console.log('Mod Pal online!')

    loadCommands(client)
    loadFeatures(client)

    await mongo().then(mongoose => {
        try {
            console.log('Connected to Mongo!')
        } finally {
          mongoose.connection.close()

    client.user.setPresence({
        activity: {
            name: '!help',
            type: 'PLAYING'
        }
    })
        }
    })
})

client.login(config.token)