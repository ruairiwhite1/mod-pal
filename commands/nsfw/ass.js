const fetch = require('node-fetch');

module.exports = {
        name: 'ass',
        aliases: [ 'butt', 'butts', 'booty' ],
        description: 'Sends you but Pictures 🍑',
        category: 'NSFW',
        callback: async ({ message, args, text, client, prefix, instance }) => {
      try {
        var subreddits = [
          'asstastic',
          'pawg',
          'facedownassup',
          'ass',
          'brunetteass',
          'CheekyBottoms',
          'datgap',
          'underbun',
          'pawgtastic',
          'BestBooties',
          'CuteLittleButts'
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