module.exports = {
    commands: 'ping',
    description: 'Displays the bots API ping/latency',
    callback: (message, arguments, text, client) => {
        message.reply('Calculating ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            message.reply(`\nBot Latency: ${ping}\n API Latency: ${client.ws.ping}`)
        })
    }
}