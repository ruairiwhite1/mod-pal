const Guild = require('@schemas/guilds');
const discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

const emojiArray = require('@models/structures/optionArray');
const pollModel = require('@schemas/poll');
const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/"(\d+(s|m|h|d|w))"/);
const moment = require('moment');
const ms = require('ms');


module.exports = {
        name: 'poll',
        description: 'Create a poll within the discord server!',
        category: 'Utility',
        cooldown: '3s',
        permission: ["MANAGE_MESSAGES"],
        callback: async ({ message, args, client, prefix, instance }) =>{

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`@util/language/english.json`)
      
       const pollParameters = args.join(' ');


        const pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;

     //   console.log(squigglyRegex.exec(pollParameters));


let embedValid = new MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`${language.poll1.replace(/{prefix}/g, `${prefix}`)}`)
.setFooter('Powered by Imagination Bot')
.setColor('GREEN')

let embedValid2 = new MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`__**${language.poll2}**${language.poll1.replace(/{prefix}/g, `${prefix}`)}`)
.setFooter('Powered by Imagination Bot')
.setColor('GREEN')


        if (!pollTitle) {
            return message.channel.send(embedValid).catch(err => console.log(err));
        }

        pollParameters.replace(`{${pollTitle}}`, '');
        const pollsArray = pollParameters.match(squareRegex);

        if (!pollsArray) {
            return message.channel.send(embedValid).catch(() => {});
        }
        else if (pollsArray.length > 20) {
            return message.channel.send(embedValid2).catch(() => {});
        }

        let i = 0;
        const pollString = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');

const text = args.slice(0).join(' ')
//console.log(text)
        const timedPoll = timeRegex.test(args[0]) ? timeRegex.exec(args[0])[1] : null;


        const embed = {
            color: 'BLUE',
            title: pollTitle,
            description: pollString,
            footer: {
                text: timedPoll ? `${language.poll3} ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : '',
            },
        };

        
let msg = await message.channel.send({ embed: embed }).catch(() => {});

        if (timedPoll) {
           
            const pollDoc = new pollModel({
                guild: message.guild.id,
                textChannel: message.channel.id,
                message: msg.id,
                expiryDate: Date.now() + ms(timedPoll),
                title: pollTitle
            });

            await pollDoc.save().catch(err => console.log(`Poll error on pollDoc.save: ${err}`));
        }


        for (i = 0; i < pollsArray.length; i++) {
            await msg.react(emojiArray()[i]).catch(() => {});
            await delay(750);
        }

    }
};
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
