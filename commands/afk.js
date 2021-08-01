const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'afk',
    description: 'A command.',
    aliases: ['setafk', 'stayinchan'],
    async execute(client, message, args, Hyperz, config, con){
    if(config["other_configuration"].usemusic) {
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var serverQueue = afk[message.guild.id]
       if (serverQueue) {
            serverQueue.afk = !serverQueue.afk;
             message.channel.send({
                embed: {
                    color: `${config["main_config"].colorhex}`,
                    description: `💤  **|**  AFK is **\`${serverQueue.afk === true ? "enabled" : "disabled"}\`**`
                }
            });
            return  fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
        if (err) console.error(err);
    });
        };
    return sendError("There is nothing playing in this server.", message.channel);
    } else {
        message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
  },
};
