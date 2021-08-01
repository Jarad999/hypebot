const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: 'pause',
  description: 'A command.',
  aliases: ['pausesong', 'paus'],
  async execute(client, message, args, Hyperz, config, con){
    if(config["other_configuration"].usemusic) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor(`${config.main_config.colorhex}`)
      .setTitle("Music has been paused!")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  } else {
    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
  },
};
