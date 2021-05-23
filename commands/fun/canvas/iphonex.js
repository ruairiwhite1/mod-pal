const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('@schemas/guilds');
const discord = require('discord.js');
module.exports = {
        name: 'iphonex',
        description: 'Make someone fit in an iphonex!',
        category: 'Image',
        cooldown: '5s',
        callback: async ({ message, args, client, prefix, instance }) => {

            let user = message.mentions.users.first() || client.users.cache.get(args[0]) || match(args.join(" ").toLowerCase(), message.guild) || message.author;
            const guildDB = await Guild.findOne({
              guildId: message.guild.id
            });
          
            const language = require(`@util/language/english.json`)
            
            const data = await fetch(
              `https://nekobot.xyz/api/imagegen?type=iphonex&url=${user.displayAvatarURL({ size: 512 })}`
            ).then((res) => res.json());
          message.channel.send(new discord.MessageEmbed().setColor('BLUE').setImage(data.message));
          
          function match(msg, i) {
          if (!msg) return undefined;
          if (!i) return undefined;
          let user = i.members.cache.find(
            m =>
              m.user.username.toLowerCase().startsWith(msg) ||
              m.user.username.toLowerCase() === msg ||
              m.user.username.toLowerCase().includes(msg) ||
              m.displayName.toLowerCase().startsWith(msg) ||
              m.displayName.toLowerCase() === msg ||
              m.displayName.toLowerCase().includes(msg)
          );
          if (!user) return undefined;
          return user.user;
        }
           
              }}
        