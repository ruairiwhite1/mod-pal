const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "slap",
  category: "Image",
  expecetedArgs: '<user>',
  callback: async ({ message, args, text, client, prefix, instance }) => {
    const user = message.mentions.members.first()
    
    if (!user) {
      const image1 = client.user.displayAvatarURL({ format: "png" });
      const image2 = message.author.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.slap(image1, image2);
      let attachment = new MessageAttachment(slap, "slap.png");
      return message.channel.send(attachment);
    }
    if (user) {
      const image1 = message.author.displayAvatarURL({ format: "png" });
      const image2 = user.user.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.slap(image1, image2);
      let attachment = new MessageAttachment(slap, "slap.png");
      return message.channel.send(attachment);
    }
  },
};