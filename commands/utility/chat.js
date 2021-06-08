
const Chatbot  =  require("discord-chatbot");
const chatbot  =  new  Chatbot({name: "Figment", gender: "Male"});

module.exports = {
        name: 'chat',
        description: `Chat with the bot!`,
        category: 'Utility',
        expectedArgs: '<message>',
        cooldown: '5s',
        callback: async ({ message, args, text, client, prefix, instance }) => {
     chatbot.chat(args).then(reply => {
        message.reply(reply)
      })
    }
};