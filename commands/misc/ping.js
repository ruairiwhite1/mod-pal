module.exports = {
    commands: 'ping',
    category: 'Information',
    description: 'Displays the bots API ping/latency',
    callback: ({ message, args, text, client, prefix, instance }) => {
        message.channel.send('Calculating ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            message.channel.send(`\nBot Latency: ${ping}`)
        })
    }
}