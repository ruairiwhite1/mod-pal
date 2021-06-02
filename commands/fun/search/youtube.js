const { MessageEmbed, Util } = require('discord.js')
const YouTube = require("youtube-sr").default; // npm i youtube-sr

module.exports = {
    commands: ['youtube-search', 'yt-search'], // You Can Keep Any Name
    description: 'Search For Videos On YouTube ', // Optional
    category: 'Search',
    callback: async ({ message, args, text, client, prefix, instance }) => {

        const video = args.join(' ') // Name Of Video To Search
        if(!video) return message.reply(`Which Video Do You Want To Search For?`) // If No Video Title Is Provided

        function getVideo(title, url, duration, thumbnail, views, uploadedAt, description) { // Get Info About Video
            const reslut = {
                "title": title, // Title Of Video
                "url": url, // URL Of Video
                "duration": duration, // Durtion Of Video
                "thumbnail": thumbnail, // Thumbnail Of Video
                "views": views, // Views Of Video
                "description": description, // Description Of Video
                "uploadedAt": uploadedAt // Time When Video Was Uploaded
            }
            return reslut
        }

        let videoInfo = await YouTube.searchOne(video) // Search For Video
        if(!videoInfo) return message.reply(`No Video Found With **${video}**`) // If No Video Found

        videodetail = getVideo(Util.escapeMarkdown(videoInfo.title), videoInfo.url, videoInfo.durationFormatted, videoInfo.thumbnail.url, videoInfo.uploadedAt, videoInfo.views, videoInfo.description) // Details/Info Of Video

        const embed = new MessageEmbed()
        .setTitle(videodetail.title)
        .setURL(videoInfo.url)
        .setTimestamp()
        .setThumbnail(videodetail.thumbnail)
        .setColor('RANDOM')
        .setDescription(`
Duration: ${videodetail.duration}
Views: ${videodetail.views}
Uploaded: ${videodetail.uploadedAt}
        `)
        .setFooter(`Video Requested By ${message.author.username}`)
        message.channel.send(embed)
    }
}