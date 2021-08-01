module.exports = {
    name: 'warn',
    description: 'Verbally warns a user.',
    aliases: ['issuewarn', 'wrn'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id != config["main_config"].yourserverid) return message.channel.send(`This command must be ran in the main guild...`).then(msg => {
            msg.delete({ timeout: 9000 })
            message.delete()
        }).catch(e => {});

        const per = config["permissions_config"].staffperms
        if(message.member.roles.cache.some(h=>per.includes(h.id))){
        
        const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        if(pingeduser) {

            if(!args[1]) {

                try {

                    const warnEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`⚠️ You've Been Warned! ⚠️`)
                    .addFields(
                        {name: `Warned By:`, value: `${message.author.tag}`, inline: true},
                        {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                        {name: `Reason:`, value: `This is your warning to stop, if you continue, you will face the consequences!`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send(`${pingeduser.user.tag} has been warned for \`N/A\``).then(mlg => {
                        mlg.delete({ timeout: 18000 })
                    }).catch(e => {});
                
                    pingeduser.send(warnEmbed).then(msg => {
                        message.channel.send(`I have successfully alerted the user privately.`).then(mesg => {mesg.delete({ timeout: 9000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    });
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

                    await con.query(`SELECT * FROM users WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
                        await con.query(`UPDATE users SET warns = warns + 1 WHERE userid='${pingeduser.user.id}'`, async (err, row) => {});
                    });

                    await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                        let uniqueid = row[0].total + 1
                        await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid) VALUES ('${pingeduser.user.id}', 'No Reason Provided.', '${uniqueid}', '${message.author.id}')`, async (err, row) => {});
                    });

                    if(config["logging_config"].enable_punishment_logging) {

                        config["logging_config"].punishment_logging_channels.forEach(async chan => {
                    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new Hyperz.MessageEmbed()
                                .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                    .setAuthor(`Action Logs - User Warned`, client.user.displayAvatarURL())
                                    .addFields(
                                        {name: `Enforcer:`, value: `${message.author.tag}`},
                                        {name: `User ID:`, value: `${pingeduser.user.id}`},
                                        {name: `User Tag:`, value: `${pingeduser.user.tag}`},
                                        {name: `Reason:`, value: `No reason provided.`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${config["main_config"].copyright}`)
                                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                
                    }

                } catch(e) {
                    if(config["main_config"].debugmode) return console.log(e);
                }
                
            } else {

                try {
                    const warnEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`⚠️ You've Been Warned! ⚠️`)
                    .addFields(
                        {name: `Warned By:`, value: `${message.author.tag}`, inline: true},
                        {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                        {name: `Reason:`, value: `${args.slice(1).join(" ")}`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send(`${pingeduser.user.tag} has been warned for \`${args.slice(1).join(" ")}\``).then(mlg => {
                        mlg.delete({ timeout: 18000 })
                    }).catch(e => {});

                    let refinedreason = args.slice(1).join(" ").replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                
                    pingeduser.send(warnEmbed).then(msg => {
                        message.channel.send(`I have successfully alerted the user privately.`).then(mesg => {mesg.delete({ timeout: 9000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    });
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

                    await con.query(`SELECT * FROM users WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
                        await con.query(`UPDATE users SET warns = warns + 1 WHERE userid='${pingeduser.user.id}'`, async (err, row) => {});
                    });

                    await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                        let uniqueid = row[0].total + 1
                        await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${pingeduser.user.id}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Warning')`, async (err, row) => {});
                    });

                    if(config["logging_config"].enable_punishment_logging) {

                        config["logging_config"].punishment_logging_channels.forEach(async chan => {
                    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new Hyperz.MessageEmbed()
                                .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                    .setAuthor(`Action Logs - User Warned`, client.user.displayAvatarURL())
                                    .addFields(
                                        {name: `Enforcer:`, value: `${message.author.tag}`},
                                        {name: `User ID:`, value: `${pingeduser.user.id}`},
                                        {name: `User Tag:`, value: `${pingeduser.user.tag}`},
                                        {name: `Reason:`, value: `${args.slice(1).join(" ")}`},
                                    )
                                    .setTimestamp()
                                    .setFooter(`${config["main_config"].copyright}`)
                                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                
                    }

                } catch(e) {
                    if(config["main_config"].debugmode) return console.log(e);
                }
            }
    } else {
        message.channel.send(`I was unable to find that user.`).then(msg => {msg.delete({ timeout: 12000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    }
} else {
    message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
    },
}