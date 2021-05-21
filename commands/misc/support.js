const discord = require("discord.js");

module.exports = {
  name: "support",
  category: "Information",
  description: "Get an invite to our support discord!",
  run: async ({ message, args, text, client, prefix, instance }) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`IMAGINATION BOT SUPPORT DISCORD`)
    .setDescription(`[CLICK HERE](https://discord.gg/3bDXewcgec)`)
    .setColor("RANDOM")
    .setFooter(`Developed by Ruairiw8`)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
    
  
  }
}
