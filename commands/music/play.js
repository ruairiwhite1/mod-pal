const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['play', 'p'],
    category: 'Music',
    description: 'Play music in your own voice channel',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        embedbuilder(client, message, "#c219d8", "Searching!", args.join(" ")).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
        client.distube.play(message, args.join(" "));
    }
    }

    function embedbuilder(client, message, color, title, description){
        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, client.user.displayAvatarURL());
        if(title) embed.setTitle(title);
        if(description) embed.setDescription(description);
        return message.reply(embed);
    }