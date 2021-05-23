const discord = require("discord.js")
const Guild = require('@schemas/guilds');
const alt = require("@features/altdetector.js");

module.exports = {
      name: "abypass",
      aliases: [],
      expectedArgs: "<userID>",
      category: "Alt Detector",
      description: "Whitelist alt accounts of your choice.",
      cooldown: '5s',
      permissions: ['MANAGE_GUILD'],
      callback: async ({ message, args, text, client, prefix, instance }) => {
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`@util/language/english.json`)

      await client.users.fetch(args[0])
      .then(u => {

        alt.findOne({
          guildID: message.guild.id
        }, async (err, db) => {
                    

          
          if(!db) {
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: 7,
            altModlog: '',
            allowedAlts: [args[0]],
            altAction: 'none',
            altToggle: false,
            notifier: false,
            })
            
            await newGuild.save()
            .catch(err => { console.log( err ) })
        return message.channel.send(new discord.MessageEmbed().setColor('GREEN').setDescription(language.abypassSuccess.replace("{userID}", args[0])))

          }
          
          let oldAllowedAlts = db.allowedAlts //[]
          oldAllowedAlts.push(u.id)
          
          await db.updateOne({
            allowedAlts: oldAllowedAlts
          })
          
          message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.abypassSuccess.replace("{userID}", args[0])))
        })
      })
      .catch(err => {
        message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(language.abypassNotValidUser))
      })
    }
}