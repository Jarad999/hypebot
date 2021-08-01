const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, guild) =>{

  if(guild.id === config["main_config"].yourserverid) {

  try {

    const newguildembed = new Hyperz.MessageEmbed()
    .setColor(config["main_config"].colorhex)
    .setAuthor(`HypeBot V3!`, `https://hyperz.dev/images/logo.png`, 'https://hyperz.dev/shop')
    .setDescription('```Thank you for purchasing HypeBot! This is a message sent to you automatically to inform you that I have been added to your guild! If you did not purchase this bot, please report this issue to https://hyperz.dev/discord thank you!```')
    .setFooter(`${config["main_config"].copyright} | Created by Hyperz#0001`)

    guild.owner.send(newguildembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

  } catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
  }

  } else {
    guild.leave().catch(err => {})
    console.log(`I have left ${guild.name}, reason: Guild was not the guild set in the config file. (main_config - yourserverid)`)
  }
}