const fetch = require('node-fetch');

module.exports = {
        name: 'furry',
        description: '*nuzzles you*',
        category: 'NSFW',
        callback: async ({ message, args, text, client, prefix, instance }) => {
      try {
        var subreddits = [
          'furry',
          'furry_irl',
          'yiff'
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
}