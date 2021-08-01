const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  name: 'nowplaying',
  description: 'A command.',
  aliases: ['whatsongisthis', 'findsong', 'currentlyplaying', 'song'],
  async execute(client, message, args, Hyperz, config, con){
    if(config["other_configuration"].usemusic) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Now Playing", "https://cdn.discordapp.com/attachments/743483303281295370/802321180287565854/Music.gif")
      .setThumbnail(song.img)
      .setColor(`${config.main_config.colorhex}`)
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  } else {
    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
  },
};
