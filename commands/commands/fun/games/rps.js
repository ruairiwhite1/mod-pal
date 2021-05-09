const economy = require('@features/economy')
const Discord = require('discord.js');

module.exports = {
    commands: ['rock-paper-scissors', 'rps'],
    description: 'Play rock paper scissors against Figment',
    callback: async (message, args, text, client) => {

        const userId = message.author.id 
        const guildId = message.guild.id 

        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`How to play: \`${prefix}rps rock|paper|scissors (bet)`)
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``)

        console.log('Bot result:', result);
        if (result === choice) return message.channel.send("It's a tie! We had the same choice")

        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.channel.send('Awww better luck next time, I won!')
                else return message.channel.send('Good job you won!')
            }

            case 'paper': {
                if (result === 'scissors') return message.channel.send('Awww better luck next time, I won!')
                else return message.channel.send('Good job you won!')
            }

            case 'scissors': {
                if (result === 'rock') return message.channel.send('Awww better luck next time, I won!');
                else return message.channel.send('Good job you won!')
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``)
            }
        }
    }
}