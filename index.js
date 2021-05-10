require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('@root/config.json')
const mongo = require('@util/mongo')
const loadCommands = require('./commands/load-commands')
const command = require('@util/command')
const loadFeatures = require('@root/features/load-features')
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();


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

client.uno = new Map();

client.on('message', message => {
    if (message.content === 'can I get a') {
        // send back "HUUU YEAH!" to the channel the message was sent in
        message.channel.send('HUUU YEAH!');
    }
});

//client.login(token.token)
client.login(process.env.DJS_TOKEN)