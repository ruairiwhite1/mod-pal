module.exports = {
    commands: ['calculator', 'calc'],
    description: 'A simple calculator',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const { Calculator } = require('weky')
        await Calculator(message)
    }
}