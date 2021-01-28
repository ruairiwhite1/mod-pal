const discordJS = require('discord.js');

module.exports = {
    commands: 'report',
    description: 'Allows you to report someone from inside of the guild.',
    callback: async (message, arguments, client) => {
        if (!arguments[0]) return message.reply('You need to mention someone for this report. Ex: ``au!report (@Member)``');

        const victim = message.mentions.users.first();
        if (!victim) return message.channel.send('I cannot seem to find this Member inside of this guild.');

        const guildOwner = message.guild.owner // We are getting the owner of the discord server
        const guildBot = client.user // We are getting the Bot
        const messageAuthor = message.author // We are getting the person running this command, which is yourself

        if (victim === guildOwner) { // This means if victim is the person who made the Discord Server
            return message.channel.send('You cannot try report the Owner of this guild.');
        } else if (victim === guildBot) { // This means if the victim is the Bot
            return message.channel.send('You cannot try to report the Bot of this guild.');
        } else if (victim === messageAuthor) { // This means if the victim is yourself
            return message.channel.send('You cannot try to report yourself.');
        }
        
        // So I already made it so you cannot report yourself, the bot, yourself and someone who isn't inside of the Discord Server.

        const reportMessage = arguments.slice(1).join(' ');
        if (!reportMessage) return message.reply('You need to provide a message for this report. Ex: ``au!report (@Member) (message)``');

        message.delete();

        const ticketLogsChannel = message.guild.channels.cache.get('799952269205307452'); // Here, just put the ChannelID here. Whatever is inside of the ''. The bot will send the embed there.
        
        const ticketEmbed = new discordJS.MessageEmbed()
        .setTitle('Ticket Log')
        .setThumbnail(message.author.displayAvatarURL())
        .setColor('#ec3d0d')
        .setFooter('A Staff Member must DM the suspect.')
        .addFields(
            {
                name: 'Type:',
                value: '``Report``'
            },
            {
                name: 'Victim:',
                value: victim
            },
            {
                name: 'Suspect:',
                value: messageAuthor.tag
            },
            {
                name: 'Message:',
                value: reportMessage
            }
        )
        
        // You can edit the embed however you would like.

        messageAuthor.send(`Thank you for making **${message.guild.name}** a better place and getting rid of these rule breakers! Your report is successfully sent to the Staff Team. A Staff Member will come less than 24 hours to DM you, while you wait, gather evidence.\n\nYou Reported: **${victim}**\nFor the reason: **${reportMessage}**`); // Either delete this or change this.
        ticketLogsChannel.send(ticketEmbed);
    }
}