const discord = require("discord.js");

module.exports = {
  commands: ["invite", "inv"],
  category: "Information",
  description: "Invite Imagination Bot to another server!",
  run: async ({ message, args, text, client, prefix, instance }) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`IMAGINATION BOT INVITE`)
    .setDescription(`[CLICK HERE](https://discord.com/oauth2/authorize?client_id=787067669161574430&scope=bot&permissions=8589934591) OR [SUPPORT SERVER](https://discord.gg/98uHxr66tq)`)
    .setColor("RANDOM")
    .setFooter(`Developed by Ruairiw8`)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
    
  
  }
}
