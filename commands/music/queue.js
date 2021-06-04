const Discord = require('discord.js')

module.exports = {
    commands: ['queue', 'q'],
    category: 'Music',
    description: 'View the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        let queue = client.distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
        ).join("\n"));
    }
};