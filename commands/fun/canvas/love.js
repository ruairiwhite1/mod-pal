  
const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "love",
  aliases: [],
  category: "Image",
  description: "Return A Random Pat!",
  expectedAArgs: "qlove user1 user2 | q love id1 id2",
    callback: async ({ message, args, text, client, prefix, instance }) => {
        
        let user =  await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let user2 =  await message.mentions.members.array()[1] || message.guild.members.cache.get(args[1])
        if(!args[1]) return message.channel.send("**Enter Name Of Another Lover!**")
        
        if (!user) return message.channel.send("**Please Enter A Valid User!**")
        if (!user2) return message.channel.send("**Please Enter A Valid User!**")

        let m = await message.channel.send("**Please Wait..**");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user.user.displayAvatarURL({ format: "png", size: 512 })}&user2=${user2.user.displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "love.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch(e){
            m.edit("Error, Please Try Again! Mention Someone");
        }
    }
};