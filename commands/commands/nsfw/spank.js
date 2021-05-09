const Discord = require('discord.js')

module.exports = {
  commands: "spank",
  description: "spanks a mentioned user",
  usage: "[command] + [user]",
  callback: async (client, message, args) => {
  //command

        const user = message.mentions.users.first()
        if(!user)
        return message.reply('Mention someone to spank');

        async function work() {
        let owo = (await neko.nsfw.spank());

        const cuddleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been spanked! ")
        .setDescription((user.toString() + " has been spanked by " + message.author.toString() + "!"))
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(cuddleembed);

}

}
                };