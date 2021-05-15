const fetch = require('node-fetch');
module.exports = {
        commands: 'joke',
        category: 'Fun',
        description: 'Generate a random joke from jokeAPI',
        callback: async ({ message, args, text, client, prefix, instance }) => {
            const data = await fetch(`https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist`).then(res => res.json())
      
            if (!data) return message.channel.send(`Sorry, seems like i can't connect to JokeAPI.`)
          
            const { type, category, joke, setup, delivery } = data
      
            message.channel.send({
              embed: {
                color: 'LUMINOUS_VIVID_PINK',
                title: `${category} joke`,
                description: `${type === 'twopart' ? `${setup}\n\n||${delivery}||` : joke}`,
              }
            });
        }
      }