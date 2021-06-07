const { MessageReaction, User, MessageEmbed } = require("discord.js");
const discord = require("discord.js");
const Discord = require("discord.js");
const moment = require('moment')
const config = require('@root/config.json')
const GuildDB = require('@schemas/guilds');
const reactionTicket = require("@schemas/tickets.js")
const reactionCooldown = new Set();
const optionAdd =  new Set();
const ticketCooldownLol = new Set();
const botCooldown = new Set();
/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

 module.exports = async (client) => {
    client.on('messageReactionAdd', async (messageReaction, user) => {
	
//ignore bot's reactions
if (client.user === user) return;

const { message, emoji } = messageReaction;

// fetch the member
const member = message.guild.members.cache.get(user.id);

const guildDB = await GuildDB.findOne({
	guildId: message.guild.id
  })

 //ticket stuff
 await reactionTicket.findOne({
	guildID: message.guild.id,
  }, async(err, db) => {

	
	if(!db) return;

	if(db.ticketType == "reaction"){

	if(db.messageID.includes(message.id)) {
	

	if(emoji.toString() === "🎫" || emoji.toString() === "🎟️" || emoji.toString() === "📩" ||emoji.toString() === "✅" ||emoji.toString() === "📻" ||emoji.toString() === "☑️" ||emoji.toString() === "📲" ||emoji.toString() === "📟" ||emoji.toString() === "🆕" ||emoji.toString() === "📤" ||emoji.toString() === "📨" ||emoji.toString() === "🔑"||emoji.toString() === "🏷️") {


if(guildDB.isPremium == "false"){
 if(emoji.toString() === "🎟️" ||emoji.toString() === "✅" ||emoji.toString() === "📻" ||emoji.toString() === "☑️" ||emoji.toString() === "📲" ||emoji.toString() === "📟" ||emoji.toString() === "🆕" ||emoji.toString() === "📤" ||emoji.toString() === "📨" ||emoji.toString() === "🔑"||emoji.toString() === "🏷️") return;
}
	  let serverCase = db.ticketCase;
if(!serverCase || serverCase === null) serverCase = '1';

	let channelReact = message.guild.channels.cache.get(db.ticketReactChannel)
	let ticketRole = message.guild.roles.cache.get(db.supportRoleID);
	let ticketCategory = message.guild.channels.cache.get(db.categoryID)
	let ticketLog = message.guild.channels.cache.get(db.ticketModlogID)

   message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})


	let id = user.id.toString().substr(0, 4) + user.discriminator;
	let chann = `ticket-${id}`;


	let array = []

	  message.guild.channels.cache.forEach(channel => {
if(channel.name == chann) array.push(channel.id)
	  })
	 

let ticketlimit = db.maxTicket
if(!ticketlimit) ticketlimit = 1

let arraylength = array.length


	if(arraylength > ticketlimit || arraylength == ticketlimit) {
	  
	  if(ticketCooldownLol.has(user.id)) return;
	   if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return;
	  message.channel.send(new discord.MessageEmbed().setColor(message.client.color.red).setDescription(`You already have ${arraylength} open tickets, as the current guild's ticket limit is ${ticketlimit} `).setAuthor(user.tag, user.displayAvatarURL()).setFooter('https://pogy.xyz')).then(m => m.delete({timeout: 5000}));
	  ticketCooldownLol.add(user.id)
	  setTimeout(()=>{
   ticketCooldownLol.delete(user.id)    
	  }, 10000)
  
return
	}


let pogy = message.guild.me;

let everyone = message.guild.roles.everyone;



	  message.guild.channels.create(chann, { permissionOverwrites:[
		 {
		  allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'MANAGE_CHANNELS'],
		  id: message.guild.me
		},
		
		{
		  allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
		  id: user
		},
		{
		  allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
		  id: ticketRole
		},
		
			 {
		  deny: [ 'VIEW_CHANNEL','SEND_MESSAGES'],
		  id: message.guild.roles.everyone
		},
	  ],
	  parent: ticketCategory.id,
	  reason: `Ticket Module`,
	  topic: `**ID:** ${user.id} | **Tag:** ${user.tag}`
	}).then(async(chan)=>{

  await chan.updateOverwrite(user, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });
  await db.updateOne({ticketCase: serverCase + 1});


	 let color = db.ticketWelcomeColor
  if(color == "#000000") color = message.guild.me.displayHexColor

  if(db.ticketPing == "true"){

if(chan){
if (!chan.permissionsFor(chan.guild.me).has('SEND_MESSAGES')) return;
if (!chan.permissionsFor(chan.guild.me).has('EMBED_LINKS')) return;

  chan.send(`${member} ${ticketRole}`).catch(()=>{})
}
  }

	chan.send(new discord.MessageEmbed()
  .setAuthor(user.tag, user.displayAvatarURL())

  .setDescription(db.ticketWelcomeMessage
	  .replace(/{user}/g, `${member}`)
	  .replace(/{user_tag}/g, `${member.tag}`)
	  .replace(/{user_name}/g, `${member.username}`)
	  .replace(/{reason}/g, `${member.username}`)
	  .replace(/{user_ID}/g, `${member.id}`) || language.ticketNewTicketWaitForAssistant)
	  
  .setColor(color)
  );

  chan.send(new MessageEmbed()
  .setDescription(`Please use \`${prefix}close\` to close the ticket.`)
  .setColor(message.client.color.red)
  .setFooter('https://pogy.xyz')
  .setTimestamp())

 

let color2 = db.ticketLogColor
  if(color2 == "#000000") color2 = `#36393f`;

  const embedLog = new discord.MessageEmbed()
	.setColor(color2)
	.setFooter('https://pogy.xyz')
	.setTitle("Ticket Created")
	.setTimestamp()
	.addField("Information" , `**User:** ${user}\n**Ticket Channel: **${chan.name}\n**Ticket:** #${serverCase}\n**Date:** ${moment(new Date()).format("dddd, MMMM Do YYYY")} `)



	if(ticketLog) {

  send(ticketLog, embedLog, {
 name: `Ticket Logs`,
 icon: `${message.client.domain}/logo.png`
}).catch(()=>{})

	
	}

	  }).catch(() => {
	if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
		message.channel.send(new discord.MessageEmbed().setColor(message.client.color.red).setDescription("There was an error creating the ticket, please check my permissions or contact support.")).then(m => m.delete({timeout: 5000})).catch(() => {})
	  })
};
}
	}
})
 }
    )}
