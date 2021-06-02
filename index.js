require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const WOKCommands = require('wokcommands')

const token = require('@root/token.json')
const config = require('@root/config.json')
const mongo = require('@util/mongo')
const DisTube = require('distube')

client.distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true, plugins: [new SpotifyPlugin({ parallel: true })]})

client.on('ready', async () => { 
    console.log('Imagination Bot online!')
	
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
	.setCategorySettings('NSFW', '👀')
	.setCategorySettings('Search', '🔎')
    client.user.setPresence({
        activity: {
            name: '!help | Playing in the development playground',
            type: 'PLAYING'
        }
    });
        },
)


require('@dashboard/server');

client.login(token.token)
//client.login(process.env.DJS_TOKEN)