const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kick",
    description: 'Kicks a member from the discord',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        
        const member = message.mentions.members.first()
        const reason = args.slice(1).join(" ")

        if(!message.member.hasPermission('KICK_MEMBERS')) {
            const no = new MessageEmbed()
            .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
            .setDescription(`You dont have any permissions to execute this command!`)
            .setColor(`#A45EE5`)
            message.channel.send(no)
        } else {
            if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
                    const no2 = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                    .setDescription(`I dont have permissions to kick!`)
                    .setColor(`#A45EE5`)
                    message.channel.send(no2)
            } else {

            if(!member) {
                const members = new MessageEmbed()
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                .setDescription(`Please mention someone to kick!`)
                .setColor(`#A45EE5`)
                message.channel.send(members)
            } else {
                if(!reason) {
                    const r = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                    .setDescription(`Please specify a reason!`)
                    .setColor(`#A45EE5`)
                    message.channel.send(r)
                } else {
                    if(member.kickable) {
                        member.kick(reason)
                        const done = new MessageEmbed()
                        .setTitle('Success!')
                        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true})}`)
                        .setDescription(`Kicked ${member} for ${reason}.`)
                        .setFooter(`Requested by: ${message.author.username}`)
                        .setColor(`#A45EE5`)
                        message.channel.send(done)
                    } else {
                        const cant = new MessageEmbed()
                        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                        .setDescription("This user is either a **Moderator**, **Administrator** or has **some** sort of role higher than mine!")
                        .setColor(`#A45EE5`)
                        message.channel.send(cant)
                    }
                }
            }
        }

    }
   }
}