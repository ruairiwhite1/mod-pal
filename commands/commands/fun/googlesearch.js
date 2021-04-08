const { Client, MessageEmbed } = require("discord.js")
module.exports = {
    commands: "google",
    expectedArgs: "!google <search>",
    description: "Searching everything. :)",

    callback: async (message, args) => {
        const language = args.join(' ');

        let startTime = message.createdTimestamp;
        let endTime = new Date().getTime()

        const numberresult = Math.floor (Math.random() * 1000000000) + 1;

        const query = encodeURIComponent(args.join("+"));

        message.channel.send(new MessageEmbed().setTitle(`Searched Result for ${language}`).setFooter(`About ${numberresult} results (${(Math.round(endTime - startTime) / 100000 )} seconds)`).setDescription(`[https://www.google.com/search?=${query}/](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`));
        
    }
}