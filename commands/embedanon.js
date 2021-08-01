module.exports = {
    name: 'embedanon',
    description: 'A command.',
    aliases: ['sayemanon', 'sayembedanon', 'sayanonembed', 'anonembed', 'aembed', 'embeda'],
    async execute(client, message, args, Hyperz, config, con){
    const per = config["permissions_config"].staffperms
    if(message.member.roles.cache.some(h=>per.includes(h.id))){

      if(!args[0]) {
          message.channel.send("You have to input something for me to say...").then(msg => {
            msg.delete({ timeout: 8000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
          });
      } else {
          const sayEmbed = new Hyperz.MessageEmbed()
          .setColor(config["main_config"].colorhex)
          .setDescription(args.join(" "))
          .setTimestamp()
          .setFooter(`${config["main_config"].copyright}`)
          
          message.channel.send(sayEmbed)
          message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
      }
        

    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}
}
}

// Credits:
// Physical Programming: Hyperz#0001

