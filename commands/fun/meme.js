const { MessageEmbed } = require('discord.js');
const somethingRandom = require('some-random-cat').Random 
const subreddits = [
    "meme",
    "memes",
    "dankmemes",
]

module.exports ={
    commands: 'meme',
    category: 'Fun',
    description: 'Displays a meme from a random subreddit',
    callback: async ({ message, args, text, client, prefix, instance }) => {
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