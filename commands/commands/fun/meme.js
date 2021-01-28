const { MessageEmbed } = require('discord.js');
const somethingRandom = require('some-random-cat').Random // Import the package...
const subreddits = [
    "meme",
    "memes",
    "dankmemes",
    // You can add as many as you wish...
]

module.exports ={
    commands: 'meme',
    description: 'Displays a meme from a random subreddit',
    callback: async (message, client, arguments) => {
        let randomSubReddit = subreddits[Math.floor(Math.random() * subreddits.length)] // Generates a random subreddit from the array...
        somethingRandom.getMeme(randomSubReddit).then(res => {
            const embed = new MessageEmbed()
            .setTitle(res.title)
            .setURL(`https://www.reddit.com/r/${randomSubReddit}`)
            .setImage(res.img)
            .setFooter(`👍 ${res.upvotes} | 💬 ${res.comments}`)
            .setAuthor(`From ${res.author}`)
            .setColor('RANDOM')
            message.channel.send(embed)
            console.log(res)
        }).catch(e => message.channel.send('API Error.'))
    }
}