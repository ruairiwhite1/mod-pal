const { MessageEmbed } = require("discord.js");
module.exports = {
name: "ainfo",
description: "`Show detailed stats of bot`",
aliases: ["detail"],
ownerOnly: true,
testOnly: true,
callback: async ({ message, args, text, client, prefix, instance }) => {

let servers_count = message.client.guilds.cache.size;
var myarray = [];
message.client.guilds.cache.keyArray().forEach(async function(item, index) {

let guildMember = message.client.guilds.cache.get(item).memberCount;
myarray.push(guildMember)
})
let sum = myarray.reduce(function (a, b) {
return a + b
});

let totalSeconds = message.client.uptime / 1000;
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds\`\`\``;

let embed = new MessageEmbed()

.setTitle(`**[Support Server]**`)
  .setDescription(`Hey My name is **${message.client.user.username}** and My Work is fun mode etc.`)

  .setTitle(`${message.client.user.username} Stats`)
  .addFields(
    { name: "📊 Servers:", value: `\`\`\`${servers_count}\`\`\``, inline: true },
    { name: "👨 Users:", value: `\`\`\`${sum}\`\`\``, inline: true },
    { name: "🌎 Channels",value: `\`\`\`${message.client.channels.cache.size}\`\`\``, inline: true },
    { name: "⏱️ Uptime: ", value: uptime , inline: true },
    { name: "🏓 Ping:",value: `\`\`\`${Math.round(message.client.ws.ping)} ms\`\`\``, inline: true },
    { name: "🖥️ RAM: ", value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true  },
    { name: "<:Ruairiw8:748995991310565436> Bot Owner:",value: `\`\`\`Ruairiw8\`\`\``},
  )
  .setColor("3498DB")
  .setFooter("Thx For Choosing Imagination Bot")  

return message.channel.send(embed);
}
};

console.log("stats working")