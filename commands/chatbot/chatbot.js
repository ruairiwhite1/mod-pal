const Discord = require('discord.js');
const config = require('@root/config.json');
const { Database } = require('mongoose');
const { getChannelId } = require('@commands/config/setwelcome')

const emote = require('@assets/json/emotes.json');
const emotes = require('@assets/json/emotes.json');

module.exports = {
	name: 'chatbot',
	category: 'chatbot',
	description: "Shows ChatBot's config",

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	callback: async ({ message, args, text, client, prefix, instance }) => {
		const embedd = new Discord.MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setDescription(
				`${emote.star}ChatBot Configuration 
        ${emote.success}**Current ChatBot Channel**
        None
        **Usage:**
         Type \`${prefix}setchatbot\` - To Set a Channel 
         Type \`${prefix}disablechatbot\` - To Disable a Channel.
         **Examples**
         \`${prefix}setchatbot\` <#${message.channel.id}>
         \`${prefix}disablechatbot\` <#${message.channel.id}>`)
			.setColor(config.embedcolor)
    
		try {
			let channel1 = getChannelId(guild.id)
			if (!channel1) return message.channel.send(embedd);
			var sChannel = message.guild.channels.cache.get(channel1);
			let embedvch = '<#' + sChannel.id + '>';
			const cembed = new Discord.MessageEmbed()

				.setThumbnail(client.user.avatarURL())
				.setDescription(
					`${emote.star}**ChatBot Settings**
        ${emote.success}**Current ChatBot Channel**
        ${embedvch}
        ${emote.info}**Usage**
        Type \`${prefix}setchatbot\` - To Set a Channel 
        Type \`${prefix}disablechatbot\` - To Disable a Channel.
        ${emote.info}**Examples**
        \`${prefix}setchatbot\` <#${message.channel.id}>
        \`${prefix}disablechatbot\` <#${message.channel.id}>`
				)
				.setColor(config.embedcolor);
			message.channel.send(cembed);
		} catch (err) {
			return message.channel.send(
				`${
					emote.error
				} Error - Cannot find setted chatbot channel run \`s!setchatbotchannel\` to setup chatbot!`
			);
		}
		// } catch (err) {
		//   return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
		//       setTimeout(() => {
		//           msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
		//       }, 3000)
		// })
		// }
	}
}
