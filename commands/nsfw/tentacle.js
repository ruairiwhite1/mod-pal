
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
            name: 'tentacle',
            description: 'Finds...tentacle..porn?? For...?? You!',
            category: 'NSFW',
            usage: 'tentacle',
            guildOnly: true,
            aliases: ['shokushu', 'tentai', 'tentacles'],
            callback: async (message, args) => {

        randomPuppy('tentai')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`tentacles`)
                .setDescription(`[Image URL](${url})`)
                .setImage(url)
                .setColor('RANDOM');
            return message.channel.send({ embed });
        })
    }
}
