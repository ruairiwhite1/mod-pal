const request = require('node-superfetch');
const fsn = require("fs-nextra");
const Discord = require('discord.js');
const {
    Canvas
  } = require('canvas-constructor');

module.exports = {
    commands: 'banned',
    description: 'Fake a ban user',
    callback: async (bot, message, args, text, client, arguments) => {

        const getSlapped = async (person) => {
          const plate = await fsn.readFile('@images/banned.png');
          const png = person.replace('.gif', '.png');
          const {
            body
          } = await request.get(png);
          return new Canvas(1851, 1828)
            .setColor(0x00A2E8)
            .addImage(body, 0, 0, 1851, 1828)
            //.restore()
            .addImage(plate, 0, 0, 1851, 1828)
            .toBuffer();
        };
        try {
          if (message.mentions.users.size < 1) {
            const person = message.author.avatarURL;
            const result = await getSlapped(person);
            await message.channel.send({
              files: [{
                attachment: result,
                name: 'banned.png'
              }]
            });
          } else {
            const person = message.mentions.users.first().avatarURL;
            const result = await getSlapped(person);
            await message.channel.send({
              files: [{
                attachment: result,
                name: 'rude.png'
              }]
            });
          }
        } catch (error) {
          throw error;
        }
    }
}    