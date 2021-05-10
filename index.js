require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()

//const config = require('@root/config.json')
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

//Uno 2.0
  
//Uno

client.on("message", async message => {
    if (message.content.toLowerCase() === "!creategame")
        await discordUNO.createGame(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!join")
        await discordUNO.addUser(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!leave")
        await discordUNO.removeUser(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!startgame")
        await discordUNO.startGame(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!endgame")
        await discordUNO.endGame(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!closegame")
        await discordUNO.closeGame(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase().startsWith("!play"))
        await discordUNO.playCard(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase().startsWith("!UNO"))
        await discordUNO.UNO(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!draw")
        await discordUNO.draw(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!cards")
        await discordUNO.viewCards(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!table")
        await discordUNO.viewTable(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!viewwinners")
        await discordUNO.viewWinners(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!settings")
        await discordUNO.updateSetting(message);
});

client.on("message", async message => {
    if (message.content.toLowerCase() === "!viewsettings") 
        await discordUNO.viewSettings(message);
});



client.login(process.env.DJS_TOKEN)