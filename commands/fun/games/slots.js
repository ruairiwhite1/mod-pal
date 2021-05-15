const economy = require('@features/economy')
const Discord = require('discord.js');

module.exports = {
    commands: 'slots',
    category: 'Games',
    description: 'Roll a virtual slot machine to win big',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        const slotemoji = ":money_mouth:";

    let items = [':cherries:', ':lemon:', ':grapes:', ':watermelon:', ':tangerine:', ':dollar:', ':moneybag:', ':gem:', ':black_joker:']; 

    let $ = items[Math.floor(items.length * Math.random())];
    let $$ = items[Math.floor(items.length * Math.random())];
    let $$$ = items[Math.floor(items.length * Math.random())];


    const play = new Discord.MessageEmbed()
        .setTitle("Slot Machine")
        .setDescription("• "+slotemoji+"  "+slotemoji+"  "+slotemoji+" •")
        .setColor('RANDOM')
        .setFooter("are you lucky bitch?")

    const $1 = new Discord.MessageEmbed()
        .setTitle("Slot Machine")
        .setDescription("• "+$+"  "+slotemoji+"  "+slotemoji+" •")
        .setColor('RANDOM')
        .setFooter("are you lucky bitch?")
    
    const $2 = new Discord.MessageEmbed()
        .setTitle("Slot Machine")
        .setDescription("• "+$+"  "+$$+"  "+slotemoji+" •")
        .setColor('RANDOM')
        .setFooter("are you lucky bitch?")
    
    
    const $3 = new Discord.MessageEmbed()
        .setTitle("Slot Machine")
        .setDescription("• "+$+"  "+$$+"  "+$$$+" •")
        .setColor('RANDOM')
        .setFooter("are you lucky bitch?")
    
    spinner = await message.channel.send(play)
    setTimeout(() => {
    spinner.edit($1);
    }, 600);
    setTimeout(() => {
    spinner.edit($2);
    }, 1200);
    setTimeout(() => {
    spinner.edit($3);
    }, 1800);

    if($$ !== $ && $$ !== $$$) {
    setTimeout(() => {
    message.channel.send("You LOST!")
    }, 3000);
    } else if($ === $$ && $ === $$$) {
    setTimeout(() => {
    message.channel.send("You WON!")
    }, 3000);
    } else {
    message.channel.send("2 slots are equal...")
    }

        }
}