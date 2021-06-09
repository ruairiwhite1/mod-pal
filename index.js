require('module-alias/register')

const { Discord, Client, Intents } = require('discord.js')
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})
const WOKCommands = require('wokcommands')
const RPC = require('discord-rpc'); // npm i discord-rpc
const rpc = new RPC.Client({transport: 'ipc'});


//const token = require('@root/token.json')
const config = require('@root/config.json')
const mongo = require('@util/mongo')
const DisTube = require('distube')
const disbut = require('discord-buttons')(client);
const SpotifyPlugin = require("@distube/spotify")

client.distube = new DisTube(client, {
    searchSongs: 0,
    emitNewSongOnly: true,
	youtubeCookie: 'CONSENT=YES+GB.en-GB+V9; VISITOR_INFO1_LIVE=JrL9_CuvMKg; LOGIN_INFO=AFmmF2swRQIhAJQ-vCR3Bb6NADcc0-Eys4_YiJ-baq59-Ux60ZGqtWhTAiBbFg6uZ-9ScUaLT6jXRyQWsYeCVQon5f7fyaG2t3RArQ:QUQ3MjNmeThRcWstbGJPWmJ2S1VrT29hd0lqYk5neFo4aHZwandKRk80SGRYVXZnTTh1TVhXNHV0WXlKdG1YeW5PTnM2QVFIVFVHQ1d6SlRGRFEtQ1ZDQ1lzSk9QUERZMEdncnk3SFlsM0UwVDVZOEZnYXhKTkFFR3pRRnBIWmJlcWtpUEo2eUNaYWg1c3E2TWFURXlGUzBJQXR6YldCandFV256UGVDajIzaldSNGtXNjJjakVSbGVvdFJfYktmU0ZVTld1RDdfUGtPLUZVS05XSklrUDB2NXpzam1jdXB0TW9wcUw1d2RjaG9TT0pCTFR0OWpXaV9XVEM5cjhONG8zZS15WVFqSG9Saw==; HSID=AU0X8U7E8xzBlW9Tp; SSID=ABVdDGugiRq3P8JeY; APISID=xYQGvdrwLpYv7O10/AtXvRq4V-7X_DO-ob; SAPISID=zFbJ7gn3NbdZaV8X/A3ltMW6ARC-AMVDy_; __Secure-3PAPISID=zFbJ7gn3NbdZaV8X/A3ltMW6ARC-AMVDy_; PREF=tz=Europe.London&al=en&f4=4000000&f5=30; SID=-QcT9tZEd1uTrdjCoCgD5SHFO4ROZIm2uDoI0X6tuAMnqfNVLcMDe4vsicP7nOl2bK8ETA.; __Secure-3PSID=-QcT9tZEd1uTrdjCoCgD5SHFO4ROZIm2uDoI0X6tuAMnqfNVmGTZaDWFemdcb9hVgOAFbA.; YSC=-mgn7ZZinyg; SIDCC=AJi4QfHnmu1oN4ywbDSeG8Dv2JGIp8l__kRi31GFaLX1eKQ2QP8pgIoXkFgQH5YcGs01Cm1AVR8; __Secure-3PSIDCC=AJi4QfHzai0pyECPAlASA7J58V1vbnSw748Xx9gjtDiu-WOIi7hoiT37xP_DQ4zB67G8mKdC1Ys',
    plugins: [new SpotifyPlugin({ parallel: true })]
})

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

    });


rpc.on('ready', () => {
    rpc.setActivity({
        details: '🖌 Imagination works best when its set free!', // Large text which is under the client name
        state: 'Watching your server', // Small text under the large text
        startTimestamp: new Date(), // starts new time stamp | you can add hourse to start from!
        largeImageKey: 'LARGE-KEY', // Images keys can get from https://discord.com/developers/applications > Your client > Rich Presence > Art Assets > upload ur image and the name is: 'LARGE-KEY'!
        largeImageText: 'Imagination!', // text shows when you aim on the large image
        buttons: [{label : 'button1', url : 'https://discord.com/oauth2/authorize?client_id=787067669161574430&scope=bot&permissions=8'}]
    });

    console.log('RPC online');
});

rpc.login({
    clientId: '787067669161574430' // create client from https://discord.com/developers/applications then go to General Information and copy the APPLICATION ID! NOTE: Don't add bot to the application! 
});


require('@dashboard/server');

//client.login(token.token)
client.login(process.env.DJS_TOKEN)