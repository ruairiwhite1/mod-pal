const client = require('@root/index')
const config= require("@root/config.json")
require("@root/ExtendedMessage");
const path = require('path')
const { getChannelId } = require('@commands/chatbot/setChatbotchannel')
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
module.exports = (client) => {
    client.on('message', async (message) => {

        const channelId = getChannelId(message.guild.id)
        if (!channelId) return
    
        const channel = message.guild.channels.cache.get(channelId)
        if (!channel) {
          return
        }
        if(channel !== message.channel.id) return
          message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
          if (message.content.includes(`@`)) {
            return message.reply(`**:x: Please dont mention anyone**`);
          }
          message.channel.startTyping();
          if (!message.content) return message.reply("Please say something.");
          scb.chat({message: message.content, name: client.user.username, owner:"CoolOwnerName", user: message.author.id, language:"en"}).then(reply => {
          message.reply(reply);
          })
            messagechannel.stopTyping();
        }
    )}

