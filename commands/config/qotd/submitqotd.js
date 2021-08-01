const Discord = require('discord.js')
const discord = require('discord.js')
const questions = require('@schemas/questions')
const mongo = require('@util/mongo')
const squareRegex = RegExp(/\[[^[]+\]/g);

module.exports ={
    commands: 'qotd',
    expectedArgs: "!qotd <message>",
    category: 'Fun',
    description: 'Submit a QOTD (DM Only)',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        if (message.channel.type == "dm") {

        const userId = message.author.id

        const submittedQuestion = args.join(' ');

            if(!submittedQuestion) return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`☹️ | No question specified`));
        if(submittedQuestion.length < 5) return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`☹️ | Submitted question is too short`));
        if(submittedQuestion.length > 60) return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(`☹️ | Submitted question too long`));
        let newQOTD = new questions({
          userId: message.author.id,
          question: submittedQuestion
          })

          await newQOTD.save()
                .catch(err => { console.log( err ) })
                return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' })).setDescription(`🎉 | Your question has been submitted!`).setFooter('Imagination Bot Developed by Ruairiw8').setTimestamp().setColor('RED'));
        } else {
            message.reply('Hey! This command can only be used in a dm!')
        }
    }
}