const Color = "GREY", Random = require("srod-v2");
const Discord = require("discord.js");
module.exports = {
  name: "pride",
  category: "Image",
  description: "Return a Prideified Image!",
  expectedArgs: "<Mention Or ID>",
  callback: async ({ message, args, text, client, prefix, instance }) => {
     try{
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Data = await Random.Gay({ Image: Member.user.displayAvatarURL({ format: "png" }), Color: Color });

    return message.channel.send(Data);
  } catch (err) {
    return message.channel.send(`Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
})
}
  }
};