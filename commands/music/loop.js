const Discord = require('discord.js')

module.exports = {
    commands: ['repeat', 'loop'],
    category: 'Music',
    description: 'Loop the current queue or song',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        
        let mode = client.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        message.channel.send("Set repeat mode to `" + mode + "`");
    }
}