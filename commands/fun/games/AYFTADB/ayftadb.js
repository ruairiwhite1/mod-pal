const getPlayers = require('./getPlayers')
module.exports = {
    commands: ["ayftadb", "Are-you-funnier", "Funnier-than-a-discord-bot"],
    description: "Start a game of Are you funnier than a discord bot!",
    requiredPermissions: ['EMBED_LINKS'],
    callback: async ({ message, args, text, client, prefix, instance }) => {
        if (message.client.ayftadb.get(message.guild.id)) return message.channel.send(`There can only be one game of Are You Funnier Than A Discord Bot at a time!`)
        else message.client.ayftadb.set(message.guild.id, true)
        const users = await getPlayers(message)
        let phrases =  [
            'Describe the MCU (Marvel Cinematic Universe) in just 4 words!',
            'Fill in the blank: A group of moms is called a...',
            'What new Olympic sport would you like to see?',
            "What's the worst thing to say during sex?",
            "Fill in the blank: A group of Discord moderators is called a...",
            'What would YouTubers do without out YouTube?',
            'If you could shrink in size, what would you do?',
            "What's something only REAL good friends do?",
            "Fill in the blank: Anything is possible! Well, except...",
            "Finish the poem: Roses are red, Violets are fake...",
            "When did you stop believing in Santa?",
            "What's the last text you sent?",
            "What's the last text you will send to your Minecraft girlfriend?",
            "In just 4 words, describe modern music to Beethoven",
            "Fill in the blank: The main benefit to going vegan is...",
            "What's the worst theme for a birthday party?",
            "Roast your opponents",
            "What's your best parenting tip?",
            "Fill in the blank: Wanna feel old?",
            "You have 100 million followers on Twitter. What's your next tweet?",
            "What's the last thing you'd want to hear from your Uber driver?",
            "Clickbait it: Got a coffee during lunch today.",
            "Fill in the blank: A group of flat-earthers is called a...",
            "What's the best way to dump someone?",
            "What's the plot to Shrek 5",
            "Complete the poem: Roses are red, Violets are green...",
            "Summarize the film Avengers Endgame in just 4 words",  
            "Summarize the film series Harry Potter in just 4 words", 
            "Summarize the film The Bee movie in just 4 words", 
            "Summarize the film series Lord of The Rings in just 4 words",
            "What does MAGA stand for?",
            "What does NASA stand for?",
            "What does USA stand for?",
            "What does LOL stand for?",
            "What does IDK stand for?",
            "What does LMAO stand for?",
            "Oh no! You got canceled! What do you do know?",
            "What's your campaign slogan?",
            "Describe YouTube in just 4 words",
            "Describe PETA in just 4 words",
            "Describe TikTok in just 4 words",
            "Describe FaceBook in just 4 words",
            "Describe Twitter in just 4 words",
            "Describe Reddit in just 4 words",
            "Describe Instagram in just 4 words",
            "Describe Tumblr in just 4 words",
            "Describe Disney in just 4 words",
            "What feature will the next smartphone have?",
            "Worst thing to say during sex?",
            "What makes a man a man?",
            "Finish the poem: Roses are red, Violets are neat...",
            "Clickbait it: I took a walk yesterday...",
            "You have a cloning mechine, how do you use it?",
            "What's the worst super power to have?",
            "Describe your love life with a movie title.",
            "What do the British call 'hot dogs'?",
            "Oh god, you're now invisible. What do you do with this new acquired power?",
            "What makes you cringe?",
            "What is the best way to dump someone?",
            "In just 4 words, describe yourself",
            "What turns you on?",
            "What turns you off",
            "In just 4 words, describe anime",
            "What's the worst thing to say at a funeral?",
            "What's the fastest way to loose your friends?",
            "Fill in the blank: My name is Eminem and I'm here to say...",
            "How have you disappointed your parents today?",
            "You've died and gone to Heaven. You meet God. What does he say to you?",
            "You've died and gone to Heaven. You meet God. What do you say to him?",
            "You've died and gone to Hell. You meet Satan. What does he say to you?",
            "You've died and gone to Hell. You meet Satan. What do you say to him?",
            "Fill in the blank: I love you like _____ loves _____",
            "What's your meanest insult without cursing?",
            "In just four words: Explain how to be funny",
            "Fill in the blank: Men only want _____ and it's disgusting.",
            "Finish the poem: Roses are red, violets are wild...",
            "Clickbait: Accidentally bumped into a stranger on the sidewalk",
            "What new features does Twitter 2.0 have?",
            "What's the saddest video game quote?",
            "Fill in the blank: Women be shopping, men be...",
        ]
        let pick = phrases[Math.floor(Math.random()* phrases.length)];
    }
}