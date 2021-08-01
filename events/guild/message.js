const fs = require('fs');

module.exports = async (client, Hyperz, config, con, message) =>{
    const prefix = config["main_config"].prefix;
    const args = message.content.slice(prefix.length).split(/ +/);

    if(message.author.bot){
    } else {

    try {
        if(config.autoreact.enabled) {
            config.autoreact.cases.forEach(async e => {
                if(message.channel.id === e.channelid) {
                    await message.react(e.emoji).catch(e => {})
                }
            });
        }
    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

    try {
        if(config.autorespond.enabled) {
            let daCont = message.content.toLowerCase()
            config.autorespond.cases.forEach(async e => {
                if(daCont === e.content) {
                    await message.reply(e.respond).catch(e => {})
                }
            });
        }
    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

    if(message.channel.type != 'dm') {

        if(config["filter_config"].enabled) {
            const per = config["permissions_config"].bypassfilters
                if(message.member.roles.cache.some(h=>per.includes(h.id))){
                    // Just gonna leave this blank haha, don't need spam to happen *yikes*
                } else {
            if (message.content) {
                for (let word of config.filter_config.bad_words) {
                    if (message.content.toLowerCase().includes(word)) message.delete().catch((e) => { return console.log("Failed to delete a message.") })
                    }
                }
            }
        }

        if(config.leveling_config.enabled) {

            let minecraftlevels = Math.floor(Math.random() * 6) + 5;
            if(config.leveling_config.moreXPForAttachments) {
                if(message.attachments.size > 0) {
                    minecraftlevels = minecraftlevels + config.leveling_config.attachmentsBonus;
                }
            }
            if(config.leveling_config.moreXPForLongerMessages) {
                if(message.content.length > config.leveling_config.msgCharacterRequirement) {
                    minecraftlevels = minecraftlevels + config.leveling_config.longerMSGSBonus;
                }
            }
    
            await con.query(`SELECT * FROM chatlvl WHERE userid='${message.author.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    let usercurrentxp = row[0].userxp;
                    let usercurrentLvl = row[0].userlvl;
                    let usernextLvl = row[0].userlvl * config.leveling_config.levelUpMultiplier;
                    let SQLMafs =  usercurrentxp + minecraftlevels;
    
                    await con.query(`UPDATE chatlvl SET userxp='${SQLMafs}' WHERE userid='${message.author.id}'`, async (err, row) => {});
    
                    if(usernextLvl <= row[0].userxp){
    
                        await con.query(`UPDATE chatlvl SET userlvl = userlvl + 1 WHERE userid='${message.author.id}'`, async (err, row) => {
                            if(err) throw err;
                        });
    
                        const lvlembed = new Hyperz.MessageEmbed()
                        .setColor(`${config.main_config.colorhex}`)
                        .setDescription(`**${message.author.tag}** You've just leveled up! \nNew level: ${usercurrentLvl + 1}`)
                        message.channel.send(lvlembed).then(msg => {msg.delete({ timeout: 12000 })}).catch(e => {});
    
                    }
    
                } else {
                    if(config.main_config.debugmode) {
                        console.log(`User: ${message.author.tag} was not found in levels table, they have since been added!`)
                    }
                    await con.query(`INSERT INTO chatlvl (userid, userxp, userlvl) VALUES ('${message.author.id}', '0', '1')`, async (err, row) => {});
                }
            });
    
        }

        await con.query(`SELECT * FROM stickymsgs WHERE channelid = '${message.channel.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                try {
    
                    message.channel.messages.fetch().then(msgs => {
                        msgs.forEach(msg => {
                            if(msg.content === row[0].msg) {
                                msg.delete().catch(e => {});
                            } else if(msg.author === client.user) {
                                msg.delete().catch(e => {});
                            }
                        });
                    });

                    if(config.other_configuration.stickysUseEmbeds) {
                        const stickyembed = new Hyperz.MessageEmbed()
                        .setColor(`${config.main_config.colorhex}`)
                        .setDescription(`${row[0].msg}`)
                        await message.channel.send(stickyembed)
                    } else {
                        await message.channel.send(`${row[0].msg}`)
                    }
    
                } catch(e) {
                    console.log(e)
                }
            }
        });

    }


if(message.mentions.users.first()) {
    if(config.pingprev.enabled) {

    config.pingprev.data.forEach(d => {

        if(message.author.bot) return;
        if(message.mentions.users.first().id != d.userid) return;
            
        const per = config["permissions_config"].bypassfilters
        if(message.member.roles.cache.some(h=>per.includes(h.id))){
                // Just gonna leave this blank haha, don't need spam to happen *yikes*
        } else {

            const stoppingingbruhembed = new Hyperz.MessageEmbed()
            .setColor(`${d.embedcolor || config["main_config"].colorhex}`)
            .setTitle(`Please Don't Ping Me <3`)
            .setTimestamp()
            .setFooter(`New Alert!`)

            if(d.useMessage) {
                try {
                    stoppingingbruhembed.setDescription(`${d.message}`)
                } catch(e) {
                    if(config.main_config.debugmode) return console.log(e)
                }
            }

            if(d.useImage) {
                try {
                    stoppingingbruhembed.setImage(`${d.imageURL}`)
                } catch(e) {
                    if(config.main_config.debugmode) return console.log(e)
                }
            }

            // Idea from: Fuel Development

            message.channel.send(stoppingingbruhembed).then(msg => {msg.delete({ timeout: 35000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            console.log(`${message.author.tag} pinged someone from the No-Pings List.`)

        }
    });
    }
}

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases.includes(cmd));

    if(command) {
         command.execute(client, message, args, Hyperz, config, con)

            if(config["logging_config"].enable_command_logging) {
                config["logging_config"].command_logging_channels.forEach(chan => {
            
                    const thechannel = client.channels.cache.get(chan)
                    if(!thechannel) {
                        console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                    } else {
                        const logembed = new Hyperz.MessageEmbed()
                        .setColor(`${config.logging_config.command_logs_color || config.main_config.colorhex}`)
                        .setAuthor(`Action Logs - Command Entry`, client.user.displayAvatarURL())
                        .addFields(
                            {name: `User ID:`, value: `${message.author.id}`},
                            {name: `User Tag:`, value: `${message.author.tag}`},
                            {name: `Command Ran:`, value: `\`\`\`\n${message.content}\n\`\`\``},
                        )
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                        thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    }
                
                });
            }
        }

        if(message.channel.type == 'dm') {
            if(config["logging_config"].enable_botsdm_logging) {
    
                config["logging_config"].botsdm_logging_channels.forEach(chan => {
                
                    const thechannel = client.channels.cache.get(chan)
                    if(!thechannel) {
                        console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                    } else {
                        const logembed = new Hyperz.MessageEmbed()
                        .setColor(`${config.logging_config.botsdm_logs_color || config.main_config.colorhex}`)
                        .setAuthor(`Action Logs - DM Recieved`, client.user.displayAvatarURL())
                        .addFields(
                            {name: `User ID:`, value: `${message.author.id}`},
                            {name: `User Tag:`, value: `${message.author.tag}`},
                            {name: `Direct Message:`, value: `${message.content}`},
                        )
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                        thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    }
                
                });
            }
        }
    
}
}