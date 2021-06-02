const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@util/reactionrole")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
        name: 'types',
        aliases: ["rrtype", "reactionroletypes", "rrtypes"],
        description: 'Will Display all reaction role Types',
        category: 'Reaction Role',
        cooldown: '3s',
        callback: async ({ message, args, text, client, prefix, instance }) => {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

      
    
      let fail = '☹️'
      let success = '🎉'


  const embedType = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`\`Type 1\` - React adds the role, unreacting removes the role\n\`Type 2\` - Reacting will give the role but unreaction won't remove the role\n\`Type 3\` - Reacting will remove the user's role and unreacting won't give it back\n\`Type 4\` - When reacting it will remove the role, unreacting will add the role\n\`Type 5\` - Same concept as number 3 but removes the user's reaction\n\`Type 6\` - React to recieve the role and react again to remove the role`)
  .setFooter(`Developed by Ruairiw8`)
   .setColor('RED')

message.channel.send(embedType)


    }
}