module.exports = {
    name: 'delcase',
    description: 'Unwarn a member.',
    aliases: ['caseremove', 'removecase', 'revokecase', 'deletecase', 'caserevoke', 'casedelete'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            if(!args[0]) return message.channel.send(`Please provide a case ID to remove.`).then(msg => {
                msg.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => {});

    if(config["moderation_config"].enabled) {
        
        const per = config["permissions_config"].staffperms
        if(message.member.roles.cache.some(h=>per.includes(h.id))){

                    try {

                    await con.query(`SELECT * FROM cases WHERE uniqueid='${args[0]}'`, async (err, row) => {
                        if(err) throw err;
                        if(!row[0]) return message.channel.send(`That is not a valid case ID.`).then(msg => {
                            msg.delete({ timeout: 12000 })
                            message.delete()
                        }).catch(e => {});

                        await con.query(`DELETE FROM cases WHERE uniqueid='${args[0]}'`, async (err, row) => {
                            if(err) throw err;
                            message.channel.send(`I have removed that case from the database.`).then(msg => {
                                msg.delete({ timeout: 14000 })
                                message.delete()
                            }).catch(e => {});
                        });

                    if(config["logging_config"].enable_punishment_logging) {

                        config["logging_config"].punishment_logging_channels.forEach(async chan => {
                    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new Hyperz.MessageEmbed()
                                .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                    .setAuthor(`Action Logs - Case Revoked`, client.user.displayAvatarURL())
                                    .addFields(
                                        {name: `Case ID:`, value: `${args[0]}`},
                                        {name: `Enforcer:`, value: `${message.author.tag}`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${config["main_config"].copyright}`)
                                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        }); 
                
                    }
                
                });
                    
            } catch(e) {
                        
                if(config["main_config"].debugmode) return console.log(e);
                    
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