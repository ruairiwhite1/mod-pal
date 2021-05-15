const figlet = require('figlet');

module.exports = {
    commands: 'ascii',
    category: 'Fun',
    description: 'Transform text to ASCII.',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const textToTurnASCII = args.join(" ");

        figlet.text(textToTurnASCII, (err, text) => {
            if (err) return msg.channel.send(err);
            message.channel.send(`\`\`\` ${text.trimRight()} \`\`\``);
        });
    }
};