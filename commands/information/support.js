const discord = require("discord.js");

module.exports = {
  name: "support",
  category: "Help",
  description: "Get an invite to our support discord!",
  testOnly: true,
  run: async ({ message, args, text, client, prefix, instance }) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`IMAGINATION BOT SUPPORT DISCORD`)
    .setDescription(`[CLICK HERE](https://discord.gg/98uHxr66tq)`)
    .setColor("RANDOM")
    .setFooter(`Developed by Ruairiw8`)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
    
  
  }
}
