const Discord = require('discord.js')
const DisTube = require('distube')
const SpotifyPlugin = require("@distube/spotify")

module.exports = client => {
    const distube = new DisTube(client, {
        searchSongs: 10,
        emitNewSongOnly: true,
        plugins: [new SpotifyPlugin({ parallel: true })]
    })

const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube.on("addSong", (message, queue, song) => message.channel.send(
    `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
));

client.distube.on("empty", message => message.channel.send("Channel is empty. Leaving the channel"))

client.distube.on("empty", message => message.channel.send("Channel is empty. Leaving the channel"))

client.distube.on("finish", message => message.channel.send("No more song in queue"));

client.distube.on("noRelated", message => message.channel.send("Can't find related video to play. Stop playing music."));
}