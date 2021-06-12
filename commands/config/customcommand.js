const { MessageEmbed } = require('discord.js');
const customCommand = require('@schemas/customCommand.js');
const Guild = require('@schemas/guilds');
module.exports = {
        name: 'createcommand',
        description: 'Create a custom command',
        aliases: [ 'cc', 'customcommand'],
        expectedArgs: [ '<command> <reply>' ],
        cooldown: '3s',
        permissions: ['MANAGE_GUILD'],
        callback: async ({ message, args, text, client, prefix, instance }) => {
     

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

    
      const language = require(`@util/language/english.json`)
      const namee = args[0];

      if (!namee) return message.channel.send( new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${language.properusage} \`${prefix}customcommand <command-name> <text-reply>\`\n\n${language.example} \`${prefix}customcommand ping pong\``)
      .setTimestamp()
      .setFooter('Powered by Imagination Bot')
      .setColor('RED'));

      let name = namee.toLowerCase()
      const content = args.slice(1).join(' ');
      if (!content) return message.channel.send( new MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${language.properusage} \`${prefix}customcommand <command-name> <text-reply>\`\n\n${language.example} \`${prefix}customcommand ping pong\``)
      .setTimestamp()
      .setFooter('Powered by Imagination Bot')
      .setColor('RED'));

  
      if (namee.length > 30) return message.channel.send(`${message.client.emoji.fail} ${language.cc1}`);
      if (content.length > 2000) return message.channel.send(`${message.client.emoji.fail} ${language.cc2}`);
  

{
  const conditional = {
   guildId: message.guild.id
}
const results = await customCommand.find(conditional)

if(results.length >= 25){
message.channel.send(new MessageEmbed().setColor('RED').setDescription(`${message.client.emoji.fail} custom Command Limit Reached **(10)**\n\n[Upgrade Premium Here for unlimited commands](Powered by Imagination Bot/premium)`))

  return;
}
}

      customCommand.findOne({ 
        guildId: message.guild.id,
        name
      }, async(err, data) => {
        if (!data) {
          customCommand.create({ guildId: message.guild.id, name, content });
          message.channel.send( new MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`**${language.cc3}** ${name}\n\nDelete the following command using \`${prefix}deletecommand <command-name>\``)
    .setTimestamp()
    .setFooter('Powered by Imagination Bot')
    .setColor('RED'))
        } 
        else {
          return message.channel.send(`☹️ ${language.cc4}`)
        }
      })

    }
};