module.exports = {
    name: 'unmute',
    description: 'Unmute a member.',
    aliases: ['unsilence', 'unshush', 'unshutup', 'unshut'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

    if(config["moderation_config"].enabled) {
        
        const per = config["permissions_config"].staffperms
        if(message.member.roles.cache.some(h=>per.includes(h.id))){

        const target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (target) {

            let tid = target.user.id
 
            const deMuteRole = config["moderation_config"].mutedroleid
                if(target.roles.cache.find(role => role.id === deMuteRole)) {

                    try {
                    target.roles.remove(deMuteRole);

                    await con.query(`UPDATE users SET isMuted = 'false' WHERE userid='${tid}'`, async (err, row) => {});
                    await con.query(`UPDATE users SET muteTime = '0' WHERE userid='${tid}'`, async (err, row) => {});

                    if(config["logging_config"].enable_punishment_logging) {

                        config["logging_config"].punishment_logging_channels.forEach(async chan => {
                    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new Hyperz.MessageEmbed()
                                .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                    .setAuthor(`Action Logs - User Un-Muted`, client.user.displayAvatarURL())
                                    .addFields(
                                        {name: `User ID:`, value: `${tid}`},
                                        {name: `User Tag:`, value: `${target.user.tag}`},
                                        {name: `Enforcer:`, value: `${message.author.tag}`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${config["main_config"].copyright}`)
                                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        }); 
                
                    }

                    const getunBeamed = new Hyperz.MessageEmbed()
                    .setColor(`${config["main_config"].colorhex}`)
                    .setTitle(`${target.user.username} was un-muted!`)
                    .setDescription(`They are officially allowed to speak again!`)
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send(getunBeamed).then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    } catch(e) {
                        if(config["main_config"].debugmode) return console.log(e);
                    }

                } else {

                    message.channel.send("That user is not muted...").then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

            }
        } else {
            message.channel.send('I couldnt find that user...').then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        }

    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}

    } else {
        message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
    },
}