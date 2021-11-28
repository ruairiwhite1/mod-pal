const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    commands: 'accept',
    description: 'Used for accepting staff',
    ownerOnly: true,
    callback: async ({ message, args, text, client, prefix, instance }) => {
        let invite = await message.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 1 // 0 = infinite uses
          }).catch(console.error);
        let acceptEmbed = new Discord.MessageEmbed()
    .setTitle(`**Wonder Network Staff Application**`)
    .setDescription(`Hello, I hope you are well. First of all, I would like to personally thank you for the time you took to apply for Wonder Network!. I am incredibly pleased to announce, Your application has been **Accepted!**. \n\nWelcome to the Wonder Network family. We very much look forward to working with you. We hope you enjoy your time here at Wonder Network. We believe you're just what we are looking for!.\nYou are joining the wonderful staff members who work incredibly hard and you too will now get a chance to ignite Dreams and ambitions in the hearts of many. Whether you are building the next big attraction or resort, keeping all communications family-friendly, engaging with the guests during shows, or even making memories, you will help deliver treasured moments to people around the Globe.\nWe feel that you will work well with others, are cooperative, mature, creative, and efficient. Also, you stand out among the crowd, We just love that!. We believe you are willing to do your best and play your part on the server.\n\n**Congratulations!**\n\nYou shall be contacted shortly about the on-boarding process\n\nWe here at Wonder Network will always be here to support you, We ask that you get in touch if you ever need help!. We appreciate our staff so much and we are so glad you choose to work for Wonder Network! \n\nSincerely,\n\n**Mr_Whippy__**\nExecutive\nHead of staff relations \nHead of legal\n\nWonder Network ©\nWonder Into The Stars!`)
    .setColor("RANDOM")
    .setFooter(`Wonder Network 2021`)
    .setThumbnail('https://cdn.discordapp.com/attachments/882713088250486844/914526000874913812/5B399675-7A99-4325-AF29-6ED7BEC618E9.jpg')
    .setImage('https://cdn.discordapp.com/attachments/882713088250486844/914471507877560330/congratulation_Banner.png')
    .setTimestamp(message.timestamp = Date.now())

    const applicant = message.guild.member(message.mentions.users.first())
    if(!applicant) {
        message.reply("You did not mention a user!")
    }
    try {
        await applicant.send(acceptEmbed)
    } 
        finally {message.channel.send('Response sent!')}
}
}