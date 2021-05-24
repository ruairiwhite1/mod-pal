require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const WOKCommands = require('wokcommands')


//const token = require('@root/token.json')
const config = require('@root/config.json')
const mongo = require('@util/mongo')
const DisTube = require('distube')
const { GiveawaysManager } = require('discord-giveaways');

const manager = new GiveawaysManager(client, {
    storage: './util/giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})
client.giveawaysManager = manager;

client.on('ready', async () => { 
    console.log('Mod Pal online!')
	
	new WOKCommands(client, {
		commandsDir: 'commands',
		featureDir: 'features',
		showWarns: false,
		testServers: ['617028673861713986', '655105137244766259']
	})
	.setMongoPath(config.mongoPath)
	.setBotOwner([
		'616926646657744898',
		'712032546950742055',
		'619654859364499471',
		'383886457636651009',
	])
	.setDisplayName('Imagination Bot')
	.setColor('0xe71177')
	.setCategorySettings('Economy', '💰')
	.setCategorySettings('Games', '🎰')
	.setCategorySettings('Fun', '🤩')
	.setCategorySettings('Music', '🎵')
	.setCategorySettings('Information', 'ℹ️')
	.setCategorySettings('Moderation', '👮‍♂️')
	.setCategorySettings('Development', '🖥')
	.setCategorySettings('Image', '🖼️')
	.setCategorySettings('Alt Detector', '🤖')
	.setCategorySettings('Applications', '✏️')
    client.user.setPresence({
        activity: {
            name: '!help',
            type: 'PLAYING'
        }
    });
        },
)


require('@dashboard/server');

//client.login(token.token)
client.login(process.env.DJS_TOKEN)