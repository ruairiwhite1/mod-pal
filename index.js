require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('@root/config.json')
const mongo = require('@util/mongo')

client.on('ready', () => {
    console.log('Mod Pal online!')
})

client.login(config.token)