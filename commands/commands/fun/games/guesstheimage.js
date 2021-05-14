const Discord = require('discord.js');
const ms = require('ms')
const inGame = new Set()

module.exports = {
    commands: ['guess', 'id'],
    description: 'Guess a randomly generated image',
    callback: async (message, args, text, client) => {
        const animals = [
            'Cow',
            'Pig',
            'Hamster',
            'Rabbit',
            'Cat',
            'Dog',
            ]

        const filter = m => m.author.id === message.author.id
        if (inGame.has(message.author.id)) return
        inGame.add(message.author.id)
        for (i = 0; i < 25; i++) {
        const time = Date.now()
        const guessAnimal = (animals[Math.floor(Math.random() * animals.length)

]
)
        message.channel.send( {files: ["@root/images/" + guessAnimal + ".png"]})
        message.channel.send(`**Guess the animal!(You have 15 seconds!)**`)
            try {
                msg = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 15000,
                    errors: ['time']
                })
            } catch (ex) {
                message.reply('Time\'s up!')
                inGame.delete(message.author.id)
                break
            }
            if (['cancel', 'end'].includes(msg.first().content.toLowerCase().trim())) {
                message.channel.send('Ended!')
                inGame.delete(message.author.id)
                break
            } else if (msg.first().content.toLowerCase().trim() === guessAnimal.toLowerCase()) {
                message.channel.send(`Good job!\nIt took you ${ms(Date.now() - time, {long: true})} to guess that animal!`)
            } else {
                message.channel.send('You failed!')
                inGame.delete(message.author.id)
                break
            }

        msg.channel.send(answer[Math.floor(Math.random() * answer.length)]
        )  
    }
}}