
const Guild = require('@schemas/guilds');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("@schemas/reactionrole")
const config = require("@root/config.json");

module.exports = {
        name: 'wipe',
        aliases: ["reactionrolewipe", "reactionroleswipe", "rrwipe"],
        description: 'Wipe all reaction Roles from the current guild',
        category: 'Reaction Role',
        cooldown: '3s',
        permissions: ['MANAGE_GUILD'],
        callback: async ({ message, args, text, client, prefix, instance }) => {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });

      


const conditional = {
   guildid: message.guild.id
}
const results = await ReactionRole.find(conditional)

if (results && results.length) {
    for (const result of results) {
        const { guildid } = result

        try {
            await ReactionRole.deleteOne(conditional)
        } catch (e) {
            console.log(e)
        }

    }

}


let resultsHeheLol = results.length
let resultsHehe = `reaction roles`
if (resultsHeheLol == '1') resultsHehe = 'reaction role';

if (resultsHeheLol === '0' || !results || !results.length){

let wipeEmbed3 = new MessageEmbed()
.setColor('RED')
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`The Current Guild has no Existing Reaction Roles!`)
.setFooter(`Developed by Ruairiw8`)

message.channel.send(wipeEmbed3)

  return;
}

let wipeEmbed = new MessageEmbed()
.setColor('GREEN')
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`Successfuly deleted **${results.length}** ${resultsHehe} from the guild.`)
.setFooter(`Developed by Ruairiw8`)


message.channel.send(wipeEmbed)
    }
};