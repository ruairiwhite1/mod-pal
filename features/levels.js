/*const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')
const Levels = require('discord-xp')
const config = require('@root/config.json')

module.exports = (client) => {

Levels.setURL(config.mongoPath)

client.on("message", async message => {

  Levels.setURL(config.mongoPath)
  
    if (!message.guild) return;
    if (message.author.bot) return;
    
    const randomXp = Math.floor(Math.random() * 9) + 1; 
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }
}
)
}*/