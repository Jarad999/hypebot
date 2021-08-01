const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../util/error");

module.exports = {
  name: 'lyrics',
  description: 'A command.',
  aliases: ['lyric', 'words'],
  async execute(client, message, args, Hyperz, config, con){
    if(config["other_configuration"].usemusic) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("There is nothing playing.",message.channel).catch(e => {if(config["main_config"].debugmode) return console.log(e);});

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.songs[0].title} — Lyrics`, "https://cdn.discordapp.com/attachments/743483303281295370/802321180287565854/Music.gif")
      .setThumbnail(queue.songs[0].img)
      .setDescription(lyrics)
      .setColor(`${config.main_config.colorhex}`)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
  } else {
    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
  },
};
