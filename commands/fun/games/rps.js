const discord = require('discord.js')
module.exports = {
    name: 'rps',
    aliases: [],
    cooldown: '2s',
    description: 'play a game of rock, paper and scissors',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        let embed = new discord.MessageEmbed()
        .setTitle("Rock, Paper, Scissors!")
        .setColor("RANDOM")
        .setDescription("React to play! Wait for the reactions to load.")
        .setTimestamp()
        let msg = await message.channel.send(embed)
        await msg.react("🗻")
        await msg.react("✂")
        await msg.react("📄")

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📄'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📄']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new discord.MessageEmbed()
                .setTitle("RESULT")
                .setColor("RANDOM")
                .addField("Your choice", `${reaction.emoji.name}`)
                .addField("My choice", `${me}`)
            await msg.edit(result)
                if ((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "📄" && reaction.emoji.name === "🗻") ||
                (me === "✂" && reaction.emoji.name === "📄")) {
                    message.reply("You lost!");
            } else if (me === reaction.emoji.name) {
                return message.reply("It's a tie!");
            } else {
                return message.reply("You won!");
            }
        })
        .catch(collected => {
                message.reply('Process has been cancelled since you did not respond in time!');
            })
}
}