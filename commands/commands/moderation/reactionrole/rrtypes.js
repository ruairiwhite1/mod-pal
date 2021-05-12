const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@root/packages/reactionrole/reaction.js")
const react = new ReactionRole()
const config = require("@root/config.json");
react.setURL(config.mongoPath)

module.exports = {
    commands: ["types","rrtype", "reactionroletypes", "rrtypes"],
    description: 'Will Display all reaction role Types',
    permissions: 'MANAGE_GUILD',
    callback:  async (message, args) => {
        let client = message.client
    
           const guildDB = await Guild.findOne({
            guildId: message.guild.id
          });
        
    
          
        
          const fail = ('☹️')
          const success = ('🎉')
    
    
      const embedType = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`\`Type 1\` - React adds the role, unreacting removes the role\n\`Type 2\` - Reacting will give the role but unreaction won't remove the role\n\`Type 3\` - Reacting will remove the user's role and unreacting won't give it back\n\`Type 4\` - When reacting it will remove the role, unreacting will add the role\n\`Type 5\` - Same concept as number 3 but removes the user's reaction\n\`Type 6\` - React to recieve the role and react again to remove the role`)
       .setColor(client.color.red)
    
    message.channel.send(embedType)
    
    
        }
    };