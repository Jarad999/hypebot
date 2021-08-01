const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: 'resume',
  description: 'A command.',
  aliases: ['continue'],
  async execute(client, message, args, Hyperz, config, con){
    if(config["other_configuration"].usemusic) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor(`${config.main_config.colorhex}`)
      .setAuthor("Music has been Resumed!", "https://cdn.discordapp.com/attachments/743483303281295370/802321180287565854/Music.gif")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  } else {
    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
  },
};
