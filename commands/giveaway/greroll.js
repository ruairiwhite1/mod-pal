const ms = require('ms'); 

module.exports = {
    commands: ["greroll"],
    expectedArgs: '<giveaway message id>',
    description: "Reroll the a giveaway, make sure you use this command in the same channel as the giveaway!",
    cooldown: '5s',
    category: 'Giveaway',
    permissions: ['MANAGE_GUILD'],
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const messageID = args[0];
        const msg = message.channel.messages.fetch(messageID)

        client.giveawaysManager.reroll(messageID).then(() => {
            message.channel.send('Success! Giveaway rerolled!');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });
    }
}