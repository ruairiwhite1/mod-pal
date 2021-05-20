const { MessageEmbed } = require('discord.js')
module.exports = async function userInit(message) {
    const embed = new MessageEmbed()
        .setAuthor(`Are You Funnier Than A Discord Bot for ${message.guild.name}`, message.client.user.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription(`React to join the game! You have fifty seconds to react!`)
        .addField(`Rules:`, `1. Remember to vote fairly in ${message.channel}\n2. Do not vote for yourself\n3. This is a last man standing game, whoever is left at the end wins!`)
    const start = await message.channel.send(embed)
    await start.react('✅').then()
    const users = []
    const reactions = await start.awaitReactions((reaction, user) => '✅' === reaction.emoji.name, {max: 15, time: 50000})
    reactions.map(entry => {
        entry.users.cache.filter((value, key) => value.id !== message.client.user.id).map(user => {
            users.push(user)
        })
    })
    if (users.length < 2) return message.channel.send('Not enough players reacted!')
    message.channel.send(`Starting the game with ${users.length} players.`)
    return users
}