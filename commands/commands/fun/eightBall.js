const Discord = require('discord.js')

module.exports ={
    commands: '8ball',
    expectedArgs: "!8ball <message>",
    description: 'you ask yes or no Question and it gives you an Answer',
    callback: async (message, arguments, client) => {
      if(!arguments[2]) return message.reply("please type a full Question");
      let replies = ["Yes.","No.","I don't know🤔","Ask again later I'm Busy","Well yes but Actually No.","Well No but Actually Yes.","how should i know ?","Yes...,Sorry I mean No."];
      
      let result = Math.floor((Math.random() * replies.length));
      let question = arguments.slice(1).join(" ");
      
      const emb = new Discord.MessageEmbed()
    .setTitle("My Answer is")
    .setColor('RANDOM')
    .setDescription(`${replies[result]}`)
      
message.channel.send(message.author, emb);
    }
}