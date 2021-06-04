const Discord = require('discord.js')
module.exports = {
    commands: ['stop', 's', 'leave'],
    category: 'Music',
    description: 'Stop the music playing in',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`)
        return client.distube.stop(message);
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