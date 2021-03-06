const economy = require('@features/economy')
const Discord = require('discord.js');

module.exports = {
    commands: ['work', 'werk'],
    cooldown: '1h',
    category: 'Economy',
    description: 'Work a job to earn some money',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const jobs = ['Programmer','Builder', 'Cast Member', 'Youtuber', 'Actor', 'Chef', 'Doctor', 'Nurse', 'Fireman', 'Lawyer', 'Tesco Employee', 'Imagineer', 'Clown', 'US President', 'Male Porn Star', 'Asda Employee', 'Jedi', 'First Order Officer', 'Wizard', 'Professional Con Person']
        const { guild, member } = message

        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 500) + 1;

        const userId = message.author.id 
        const guildId = message.guild.id 

        const newCoins = await economy.addCoins(guildId, userId, coins)

        message.channel.send(`You worked as a **${jobs[jobIndex]}** and earned **${coins}**. You now have **${newCoins}**.`);
    }
}