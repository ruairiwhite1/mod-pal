const fetch = require('node-fetch');

module.exports = {
        name: 'boobs',
        aliases: ['boob', 'boobies'],
        description: 'Sends you a random boob image 🍒.',
        category: 'NSFW',
        callback: async ({ message, args, text, client, prefix, instance }) => {
            if(!message.channel.nsfw)
            {message.channel.send("This command can only be used in NSFW channels");
        return}
      try {
        var subreddits = [
          'boobs',
          'Boobies',
          'Stacked',
          'BustyPetite',
          'Cleavage',
          'bustyasians',
          'boltedontits',
          'burstingout'
        ]
      
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
      } catch(error) {
        client.emit("apiError", error, message);
      }
    }
};