const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    commands: 'reject',
    description: 'Used for rejecting staff',
    ownerOnly: true,
    callback: async ({ message, args, text, client, prefix, instance }) => {
        let invite = await message.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 1 // 0 = infinite uses
          }).catch(console.error);
        let acceptEmbed = new Discord.MessageEmbed()
    .setTitle(`**Wonder Network Staff Application**`)
    .setDescription(`Hello, I hope you are well. First of all I would like to personally thank you for the time you took to apply for Wonder Studios!. I am incredibly saddened to announce, Your application has been **Denied**. \nUnfortunately, we won’t be Welcoming you to the Wonder Network family. We very much look forward to Seeing you apply again. We hope you enjoy your time here at Wonder Studios. We believe you're just not what we are looking for!\n\nUnfortunately, You won’t be joining the Wonder full staff members who work incredibly hard and ignite Dreams and ambitions in the hearts of many. Whether you are building the next big attraction or resort, keeping all communications family friendly, engaging with the guests during shows, or even making memories, Who help deliver treasured moments to people around the Globe. We feel that you are not a representative of the Wonder Network Brand.  We want people who can show they will work well with others, are cooperative, mature, creative, and efficient. Also, stand out among the crowd, We just love that!.  We believe you are not ready yet to start your journey as a member of staff on the server. We are very sorry. \n\nPlease do not let this deter you from applying again!. If you show us you are committed to Wonder Network, We may offer you a position next time!. \nWe here at Wonder Network are very saddened to announce this to you today.We here at Wonder Network will always be here to support you, We ask that you get in touch if you ever need help!. We appreciate our staff so much and we are so glad you choose to apply to work for Wonder Studios!. Better luck next time!.\n\nSincerely,\n\n**Mr_Whippy__**\nExecutive\nHead of staff relations \nHead of legal\n\nWonder Network ©\nWonder Into The Stars!`)
    .setColor("RANDOM")
    .setFooter(`Wonder Network 2021`)
    .setThumbnail('https://cdn.discordapp.com/attachments/882713088250486844/914526000874913812/5B399675-7A99-4325-AF29-6ED7BEC618E9.jpg')
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