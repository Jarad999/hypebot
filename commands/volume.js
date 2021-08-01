const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    name: 'volume',
    description: 'Volume of music.',
    aliases: ['vol', 'v'],
    async execute(client, message, args, Hyperz, config, con){
    const channel = message.member.voice.channel;
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('You can\'t set the volume more than 150. or lower than 0',message.channel).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: **${args[0]/1}/100**`)
    .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor(`${config.main_config.colorhex}`)
    return message.channel.send(xd);
  },
};
