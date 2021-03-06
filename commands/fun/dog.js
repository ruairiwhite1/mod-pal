const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const subreddits = [
    "dogs",
    "dogpictures",
    "goldenretrievers",
    "puppies",
    "shiba"
]

module.exports ={
    commands: 'dog',
    category: 'Fun',
    description: 'Displays a dog from a random subreddit',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        var reddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      
        const data = await fetch(`https://meme-api.herokuapp.com/gimme/${reddit}`).then(res => res.json())

        if (!data) return message.channel.send(`Sorry, seems like i can't connect to API.`);
      
        const { title, postLink, url, subreddit } = data

        message.channel.send({
          embed: {
            color: "BLURPLE",
            title: `${title}`,
            url: `${postLink}`,
            image: {
              url: url
            },
            footer: { text: `/reddit/${subreddit}` }
          }
        });
        client.emit("apiError", message);
      } 
      }