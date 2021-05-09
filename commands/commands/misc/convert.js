module.exports = {
    commands: ['convert', 'ms-s'],
    expectedArgs: '<minutes> <seconds>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    description: 'Add two numbers together',
    callback: (message, arguments, text) => {
      const num1 = +arguments[0]
      const num2 = +arguments[1]
  
      const newnum1 = num1 * 60;
      message.reply(`That time in seconds is ${newnum1 + num2}`)
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
  }