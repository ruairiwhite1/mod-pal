const Discord = require("discord.js");
const hastebin = require('hastebin.js');
const haste = new hastebin({ /* url: 'hastebin.com */ });

module.exports = {
    name: "serverhastelist",
    aliases: ["shastelist"],
    ownerOnly: true,
    testOnly: true,
    callback: async ({ message, args, text, client, prefix, instance }) => {
		let arr = new Array();
        client.guilds.cache.forEach(async servers => {
arr.push(`
--> Server Info Of ${servers.name} <--
Server Name: ${servers.name}
Member Count: ${servers.memberCount}
Server ID: ${servers.id}  
---> Info Of ${servers.name} Ends Here <--- 
`)
        })
        console.log(arr)
        const link = haste.post(arr).then(link =>   {
        const upload = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL())
        .setDescription(`[Uploaded](${link})`)
        .setFooter(message.guild.name , message.guild.iconURL())
        message.channel.send(upload)
        })
  }
  };