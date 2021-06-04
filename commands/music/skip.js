const Discord = require('discord.js')

module.exports = {
    commands: ['skip', 'next'],
    category: 'Music',
    description: 'Skip the current song',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        
        embedbuilder(client, message, "YELLOW", "SKIPPED!", `Skipped the song`)
        return client.distube.skip(message);
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