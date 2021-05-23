const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const app = require("@models/application/application.js");

module.exports = {
      name: "addquestion",
      aliases: ["addquestions", "applicationquestions", "appquestions"],
      expectedArgs: "<question>",
      description: "Add questions to the list and when you apply they will be there",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });
        const language = require(`@util/language/english.json`)
        
    
        let questions = args.slice(0).join(" ")
    
      
      let maxQuestions = 25

        if(!questions) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.addquestionMissingArg))
      let split = questions.split("|")
      
      await app.findOne({
        guildID: message.guild.id
      }, async (err, db) => {
    
      
      let arr = []
      
      if(!db) {
        let actualArr = arr.concat(split)
        console.log(actualArr)
        if(actualArr.length > maxQuestions) {
          return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.addquestionMoreThanLength.replace("{amountLength}", maxQuestions)))
        }
        let newAppDB = new app({
         guildID: message.guild.id,
         questions: actualArr,
         appToggle: false,
         appLogs: ' '
        })
        await newAppDB.save().catch((err) => {console.log(err)})
        
        return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.addquestionSuccess))
      }
      
        let ar = await db.questions
        let actualArr = ar.concat(split)
    
        if(actualArr.length > maxQuestions) {
          return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.addquestionMoreThanLength.replace("{amountLength}", maxQuestions)))
        }
        await db.updateOne({
          questions: actualArr
        })
        
        return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.addquestionSuccess))
    })
      
      }
    }
  