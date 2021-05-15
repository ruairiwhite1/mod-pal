module.exports = {
    commands: ['convert', 'ms-s'],
    expectedArgs: '<minutes> <seconds>',
    requiredPermissions: ['ADMINISTRATOR'],
    minArgs: 2,
    maxArgs: 2,
    ownerOnly: true,
    description: 'Add two numbers together',
    callback: ({ message, args, text, client, prefix, instance }) => {
      const num1 = +args[0]
      const num2 = +args[1]
  
      const newnum1 = num1 * 60;
      message.reply(`That time in seconds is ${newnum1 + num2}`)
    },
  }