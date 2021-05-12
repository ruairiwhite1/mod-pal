const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
        commands: 'nuke',
        description: 'nuke a server (FAKE) !',
        callback:  async (message, args) => {

            message.channel.send(`https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831`).catch(() => {});
            message.react('790133942095183873').catch(() => {});
    
        }
      }