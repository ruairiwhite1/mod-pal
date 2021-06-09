const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "trash",
  category: "Image",
  description: "Trash a user LMAO!",
  expectedArgs: '<user>',
  callback: async ({ message, args, text, client, prefix, instance }) => {
    const m = message.mentions.members.first()
    
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    })

    let img = await new DIG.Trash().getImage(avatar, 5);

    let attach = new Discord.MessageAttachment(img, "trash.png");
    message.channel.send(attach);
  },
};