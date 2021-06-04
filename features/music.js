const Discord = require('discord.js')

module.exports = async (client) => {
    client.distube.on("playSong", (queue, song) => queue.textChannel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ));
    client.distube.on("playSong", async (message, queue, song) => {
        try{ playsongyes(message, queue, song);
        }catch (error){
            console.error
         }
    })
    client.distube.on("addSong", (message, queue, song) => {
        try{    return embedbuilder(client, message, "#fffff0", "Added a Song!", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n\nEstimated Time: ${queue.songs.length - 1} song(s) - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`\nQueue duration: \`${queue.formattedDuration}\``, song.thumbnail)
    }catch (error){
        console.error
     }
    })
    client.distube.on("playList", (message, queue, playlist, song) => {
        try{   playplaylistyes(message, queue, playlist, song);
    }catch (error){
        console.error
     }
    })
    client.distube.on("addList", (message, queue, playlist, song) => {
        try{    return embedbuilder(client, message, "#fffff0", "Added a Playling!", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}`, playlist.thumbnail)
    }catch (error){
        console.error
     }
    })
    client.distube.on("searchResult", (message, result) => {
        try{    let i = 0;
        return embedbuilder(client, message, "#fffff0", "", `**Choose an option from below**\n${result.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    }catch (error){
        console.error
     }
    })
    client.distube.on("searchCancel", (message) => {
        try {
            message.reactions.removeAll();
            message.react("❌")
        } catch (error) {
            console.error(error)
            
        }
        try{   return embedbuilder(client, message, "RED", `Searching canceled`, "").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    client.distube.on("error", (message, err) => {
        try {
            message.reactions.removeAll();
            message.react("❌")
        } catch (error) {
            console.error(error)    
        }
       console.log(err);
        try{   return embedbuilder(client, message, "RED", "An error encountered:", "```"+err+"```")
    }catch (error){
        console.error
     }
    })
    client.distube.on("finish", message => {
        try{ return embedbuilder(client, message, "RED", "LEFT THE CHANNEL", "There are no more songs left").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    client.distube.on("empty", message => {

        try{   return embedbuilder(client, message, "RED", "Left the channel cause it got empty!").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    client.distube.on("noRelated", message => {
        try{    return embedbuilder(client, message, "RED", "Can't find related video to play. Stop playing music.").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    client.distube.on("initQueue", queue => {
        try{   queue.autoplay = false;
        queue.volume = 100;
        queue.filter = filters[5];
    }catch (error){
        console.error
     }
    });
///////////////
///FUNCTIONS///
///////////////
//function embeds creates embeds
function embedbuilder(client, message, color, title, description, thumbnail) {
    try{   let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://harmonymusic.tk")
        .setFooter(client.user.username, client.user.displayAvatarURL());
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail)
    return message.channel.send(embed);
}catch (error){
    console.error
 }
}

//this function is for playing the song
async function playsongyes(message, queue, song) {
    try{  let embed1 = new Discord.MessageEmbed()

        .setColor("#fffff0")
        .setTitle("Playing Song!")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addField("⏱ Duration:", ` \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
        .addField("🌀 Queue:", `\`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
        .addField("🔊 Volume:", `\`${queue.volume} %\``, true)
        .addField("♾ Loop:", `  \`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``, true)
        .addField("↪️ Autoplay:", `\`${queue.autoplay ? "✅" : "❌"}\``, true)
        .addField("❔ Filter:", `\`${queue.filter || "❌"}\``, true)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://harmonymusic.tk")
        .setThumbnail(song.thumbnail)

    var playingMessage = await message.channel.send(embed1)

    db.set(`playingembed_${message.guild.id}`, playingMessage.id)
    db.set(`playingchannel_${message.guild.id}`, message.channel.id)
    try {
        await playingMessage.react("⏭");
        await playingMessage.react("⏹");
        await playingMessage.react("🔉");
        await playingMessage.react("🔊");
        await playingMessage.react("◀️");
        await playingMessage.react("▶️");
    }
    catch (error) {
        message.reply("Missing permissions, i need to add reactions!")
        console.log(error);
    }

    const filter = (reaction, user) =>
        ["⏭", "⏹", "🔉", "🔊", "◀️", "▶️"].includes(reaction.emoji.name) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000
    });
    collector.on("collect", async (reaction, user) => {
        if (!queue) return;
        const member = message.guild.member(user);
        if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection) return;

        switch (reaction.emoji.name) {
            case "⏭":
                distube.skip(message);
                embedbuilder(client, message, "#fffff0", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                playingMessage.reactions.removeAll().catch(console.error);
                playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
                break;

            case "⏹":
                distube.stop(message);
                playingMessage.reactions.removeAll().catch(console.error);
                playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
                embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "🔉":

                reaction.users.remove(user).catch(console.error);
                await distube.setVolume(message, Number(queue.volume) - 10);
                embedbuilder(client, message, "#fffff0", "Volume!", `Redused the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                await playingMessage.edit(curembed(message)).catch(console.error);
                break;

            case "🔊":

                reaction.users.remove(user).catch(console.error);
                await distube.setVolume(message, Number(queue.volume) + 10);
                embedbuilder(client, message, "#fffff0", "Volume!", `Raised the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                await playingMessage.edit(curembed(message)).catch(console.error);
                break;

            case "◀️":

                reaction.users.remove(user).catch(console.error);
                let seektime = queue.currentTime - 10000;
                if (seektime < 0) seektime = 0;
                await distube.seek(message, Number(seektime));
                playingMessage.edit(curembed(message)).catch(console.error);
                embedbuilder(client, message, "#fffff0", "Seeked!", `Seeked the song for \`-10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

                break;

            case "▶️":
                reaction.users.remove(user).catch(console.error);
                let seektime2 = queue.currentTime + 10000;
                if (seektime2 >= queue.songs[0].duration * 1000) { seektime2 = queue.songs[0].duration * 1000 - 1; }
                console.log(seektime2)
                await distube.seek(message, seektime2);
                playingMessage.edit(curembed(message)).catch(console.error);
                embedbuilder(client, message, "#fffff0", "Seeked!", `Seeked the song for \`+10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
    collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
    })
}catch (error){
    console.error
 }
}

//this function is for playlistsong playing like the function above
async function playplaylistyes(message, queue, playlist, song) {
    try {
        var playingMessage = await embedbuilder(client, message, "#fffff0", "Playling playlist", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}\n\nVolume: \`${queue.volume} %\`\nLoop: \`${queue.repeatMode ? "On" : "Off"}\`\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\`\nFilter: \`${queue.filter || "❌"}\``, playlist.thumbnail)
        await playingMessage.react("⏭");
        await playingMessage.react("⏹");
        await playingMessage.react("🔉");
        await playingMessage.react("🔊");
        await playingMessage.react("◀️");
        await playingMessage.react("▶️");
    }
    catch {
        console.error(error);
    }
    try{ 
    const filter = (reaction, user) =>
        ["⏭", "⏹", "🔉", "🔊", "◀️", "▶️"].includes(reaction.emoji.name) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000
    });
    collector.on("collect", (reaction, user) => {
        if (!queue) return;
        const member = message.guild.member(user);
        if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection) return;

        switch (reaction.emoji.name) {

            case "⏭":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#fffff0", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                distube.skip(message);
                break;

            case "⏹":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                distube.stop(message);
                break;

            case "🔉":
                reaction.users.remove(user).catch(console.error);
                distube.setVolume(message, Number(queue.volume) - 10);
                embedbuilder(client, message, "#fffff0", "Volume!", `Redused the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "🔊":
                reaction.users.remove(user).catch(console.error);
                distube.setVolume(message, Number(queue.volume) + 10);
                embedbuilder(client, message, "#fffff0", "Volume!", `Raised the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "◀️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#fffff0", "Seeked!", `Seeked the song for \`-10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                let seektime = queue.currentTime - 10000;
                if (seektime < 0) seektime = 0;
                distube.seek(message, Number(seektime));
                break;

            case "▶️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#fffff0", "Seeked!", `Seeked the song for \`+10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                let seektime2 = queue.currentTime + 10000;
                console.log(seektime2);
                if (seektime2 > queue.songs[0].duration) seektime2 = queue.songs[0].duration - 1;
                distube.seek(message, Number(seektime2));
                break;

            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
    collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
    })
}catch (error){
    console.error
 }
}

//this function is for embed editing for the music info msg
function curembed(message) {
    try{  let queue = distube.getQueue(message); //get the current queue
    let song = queue.songs[0]; 
    embed = new Discord.MessageEmbed()
        .setColor("#fffff0")
        .setTitle("Playing Song!")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addField("⏱ Duration:", `\`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
        .addField("🌀 Queue:", `\`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
        .addField("🔊 Volume:", `\`${queue.volume} %\``, true)
        .addField("♾ Loop:", `\`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``, true)
        .addField("↪️ Autoplay:", `\`${queue.autoplay ? "✅" : "❌"}\``, true)
        .addField("❔ Filter:", `\`${queue.filter || "❌"}\``, true)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://harmonymusic.tk")
        .setThumbnail(song.thumbnail)
    return embed; //sending the new embed back
}catch (error){
    console.error
 }
}

//this function is for current Queue
function QueueEmbed(queue) {
    try{   let embeds = [];
    let k = 10;
    //defining each Pages
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k)
        let j = i;
        k += 10;
        const info = current.map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`).join("\n")
        const embed = new Discord.MessageEmbed()
            .setTitle("Server Queue")
            .setColor("#fffff0")
            .setDescription(`**Current Song - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
        embeds.push(embed);
    }
    //returning the Embed
    return embeds;
}catch (error){
    console.error
 }

}

//this function is for lyrics embed
function lyricsEmbed(message, lyrics, song) {
    try{   let embeds = [];
    let k = 1000;
  
    for (let i = 0; i < lyrics.length; i += 1000) {
      const current = lyrics.slice(i, k);
      let j = i;
      k += 1000;
      const embed = new Discord.MessageEmbed()
        .setTitle("Lyrics - "+ song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setColor("#fffff0")
        .setDescription(current)
      embeds.push(embed);
    }
    return embeds;
}catch (error){
    console.error
 }
}  

/////////////
///GENERAL///
/////////////
//this function is for delaying stuff if needed
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

//this function is for getting a random number
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}   
}