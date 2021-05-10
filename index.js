require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()

//const token = require('@root/token.json')
const config = require('@root/config.json')
const mongo = require('@util/mongo')
const loadCommands = require('./commands/load-commands')
const command = require('@util/command')
const loadFeatures = require('@root/features/load-features')
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();
const DisTube = require('distube')

const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true})

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

//Music

client.on('message', message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
	const command = args.shift()

	if (command === 'play') distube.play(message, args.join(' '))

	if (['repeat', 'loop'].includes(command)) distube.setRepeatMode(message, parseInt(args[0]))

	if (command === 'stop') {
		distube.stop(message)
		message.channel.send('Stopped the music!')
	}

	if (command === 'skip') distube.skip(message)

	if (command === 'queue') {
		const queue = distube.getQueue(message)
		message.channel.send(`Current queue:\n${queue.songs.map((song, id) =>
			`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`)
	}

	if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
		const filter = distube.setFilter(message, command)
		message.channel.send(`Current queue filter: ${filter || 'Off'}`)
	}
})

// Queue status template
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || 'Off'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

// DisTube event listeners, more in the documentation page
distube
	.on('playSong', (message, queue, song) => message.channel.send(
		`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`,
	))
	.on('addSong', (message, queue, song) => message.channel.send(
		`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
	))
	.on('playList', (message, queue, playlist, song) => message.channel.send(
		`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`,
	))
	.on('addList', (message, queue, playlist) => message.channel.send(
		`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`,
	))
// DisTubeOptions.searchSongs = true
	.on('searchResult', (message, result) => {
		let i = 0
		message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`)
	})
// DisTubeOptions.searchSongs = true
	.on('searchCancel', message => message.channel.send(`Searching canceled`))
	.on('error', (message, e) => {
		console.error(e)
		message.channel.send(`An error encountered: ${e}`)
	})

//client.login(token.token)
client.login(process.env.DJS_TOKEN)