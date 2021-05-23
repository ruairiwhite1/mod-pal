const ms = require('ms'); 

module.exports = {
    commands: ["gcreate", "gmake", "gstart"],
    expectedArgs: "<time> <amount> <prize>",
    description: "Start a giveaway!",
    cooldown: '5s',
    category: 'Giveaway',
    permissions: ['MANAGE_GUILD'],
    callback: async ({ message, args, text, client, prefix, instance }) => {
        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            winnerCount: parseInt(args[1]),
            prize: args.slice(2).join(' ')
        }).then((gData) => {
            console.log(gData); // {...} (messageID, end date and more)
        });
    }
}