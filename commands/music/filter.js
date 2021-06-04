const Discord = require('discord.js')
module.exports = {
    commands: ['setfilter'],
    category: 'Music',
    expectedArgs: "<filter: 3d/nightcore/bassboost/karaoke/echo/vaporwave/earwax>",
    description: 'Changes the filter of the current queue',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const filter = args[0]

        client.distube.setFilter(message, filter);
        return embedbuilder(client, message, "YELLOW", "Adding filter!", filter)
    }
}

function embedbuilder(client, message, color, title, description){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    return message.channel.send(embed);
}