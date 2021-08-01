const ms = require("ms");

module.exports = {
    name: 'timer',
    description: 'Set a timer.',
    aliases: ['settimer', 'setimer', 'newtimer', 'reminder', 'setreminder'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

        const per = config["permissions_config"].staffperms
        if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(args[1]) {

                try {

                    const reason = args.slice(1).join(" ")

                    let time = args[0];

                    if(!time){
                        return message.channel.send("You didnt specify a time!").then(msg => {
                            msg.delete({ timeout: 12000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                        });
                    } else {

                    const getBeamed = new Hyperz.MessageEmbed()
                    .setColor(`${config["main_config"].colorhex}`)
                    .setTitle(`Timer Set!`)
                    .setDescription(`I will remind you in: __${time}__!\n \n**Reason:** ${reason}`)
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send(getBeamed).then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                    setTimeout(function(){
            
                            const getunBeamed = new Hyperz.MessageEmbed()
                            .setColor(`${config["main_config"].colorhex}`)
                            .setTitle(`Timer Expired!`)
                            .setDescription(`Your timer set for: __${time}__ has expired!\n \n**Reason:** ${reason}`)
                            .setTimestamp()
                            .setFooter(`${config["main_config"].copyright}`)

                            message.channel.send(`<@${message.author.id}>`)
                            message.channel.send(getunBeamed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                    }, ms(time));
                }

                } catch(e) {
                   if(config["main_config"].debugmode) return console.log(e);
                }

            } else {

                    try {

                        let time = args[0];

                        if(!time){
                            return message.channel.send("You didnt specify a time!").then(msg => {
                                msg.delete({ timeout: 12000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                            });
                        } else {

                        const getBeamed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`Timer Set!`)
                        .setDescription(`Timer Set! I will remind you in: __${time}__!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                        message.channel.send(getBeamed).then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                        setTimeout(function(){
                
                                const getunBeamed = new Hyperz.MessageEmbed()
                                .setColor(`${config["main_config"].colorhex}`)
                                .setTitle(`Timer Expired!`)
                                .setDescription(`Your timer set for: __${time}__ has expired!`)
                                .setTimestamp()
                                .setFooter(`${config["main_config"].copyright}`)

                                message.channel.send(`<@${message.author.id}>`)
                                message.channel.send(getunBeamed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                        }, ms(time));
                    }

                    } catch(e) {
                       if(config["main_config"].debugmode) return console.log(e);
                    }

                }

                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})

    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}

} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
    },
}