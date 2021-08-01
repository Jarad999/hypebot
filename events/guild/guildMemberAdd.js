const fs = require('fs');
const config = require('../../config.json');
const ms = require('ms')

module.exports = async (client, Hyperz, config, con, guildMember) =>{

    try {

    if(guildMember.guild.id === config["main_config"].yourserverid) {

    const theguild = guildMember.guild

    if(guildMember.bot) {

    } else {

        con.query(`SELECT * FROM users WHERE userid='${guildMember.user.id}'`, async (err, row) => {
            if(!row[0]) {
                await con.query(`INSERT INTO users (userid, warns, kicks, bans, mutes) VALUES ('${guildMember.user.id}', '0', '0', '0', '0')`, async (err, row) => {});
            }
        });

        con.query(`SELECT * FROM users WHERE userid='${guildMember.user.id}' AND isMuted='true'`, (err, row) => {
            if(err) throw err;
            if(row[0]) {

                try {

                    const deMuteRole = config["moderation_config"].mutedroleid
                    guildMember.user.roles.add(deMuteRole);

                    setTimeout(() => {

                        guildMember.user.roles.remove(deMuteRole);

                        if(config["logging_config"].enable_punishment_logging) {

                            config["logging_config"].punishment_logging_channels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new Hyperz.MessageEmbed()
                                        .setColor(`${config.logging_config.punishment_logs_color}`)
                                        .setAuthor(`Action Logs - User Re-Muted`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `User ID:`, value: `${guildMember.user.id}`},
                                            {name: `User Tag:`, value: `${guildMember.user.tag}`},
                                            {name: `Reason:`, value: `Role persists from leaving when muted.`},
                                            {name: `Time:`, value: `${row[0].muteTime}`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${config["main_config"].copyright}`)
                                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                                }
                            
                            });
                    
                        }

                    }, ms(row[0].muteTime))

                } catch(e) {

                    if(config.main_config.debugmode) return console.log(e);

                }
            }
        });

    }

    if(config["new_user_config"].enabled){

        if(config["new_user_config"].useautorole) {
            try {
                config["new_user_config"].memberroleids.forEach(deMemberRole => {
                    guildMember.roles.add(deMemberRole);
                });
            } catch(e) {
                console.log(e)
            }
        }

        if(config["new_user_config"].useservername) {

                if(config["new_user_config"].usejoinmessage) {

                    if(config["new_user_config"].useembeds) {
                    const embed = new Hyperz.MessageEmbed()
                    .setColor(`${config["main_config"].colorhex}`)
                    .setTitle(`${config["new_user_config"].userjoinheader}`)
                    .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined ${config["main_config"].yourservername}!`)
                    .addFields(
                        {name: `Notice:`, value: `${config["new_user_config"].userjoinmessage}`}
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    config["new_user_config"].userjoinchannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                } else {

                    config["new_user_config"].userjoinchannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has joined ${config["main_config"].yourservername}! ${config["new_user_config"].userjoinmessage}`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                    
                }
                } else {

                    if(config["new_user_config"].useembeds) {
                        const embed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`${config["new_user_config"].userjoinheader}`)
                        .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined ${config["main_config"].yourservername}!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
    
                        config["new_user_config"].userjoinchannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                    } else {
    
                        config["new_user_config"].userjoinchannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has joined ${config["main_config"].yourservername}!`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                        
                    }

                }
        } else {

                if(config["new_user_config"].usejoinmessage) {

                    if(config["new_user_config"].useembeds) {
                    const embed = new Hyperz.MessageEmbed()
                    .setColor(`${config["main_config"].colorhex}`)
                    .setTitle(`${config["new_user_config"].userjoinheader}`)
                    .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined the server!`)
                    .addFields(
                        {name: `Notice:`, value: `${config["new_user_config"].userjoinmessage}`}
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    config["new_user_config"].userjoinchannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                } else {

                    config["new_user_config"].userjoinchannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has joined the server! ${config["new_user_config"].userjoinmessage}`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                    
                }
                } else {

                    if(config["new_user_config"].useembeds) {
                        const embed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`${config["new_user_config"].userjoinheader}`)
                        .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined the server!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
    
                        config["new_user_config"].userjoinchannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                    } else {
    
                        config["new_user_config"].userjoinchannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has joined the server!`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                        
                    }

                }
        }
    }

    await con.query(`SELECT * FROM offlinebans WHERE id='${guildMember.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {

            const getBeamed = new Hyperz.MessageEmbed()
                  .setTitle(`⚠️ You've Been Banned! ⚠️`)
                  .setColor(config["main_config"].colorhex)
                  .addFields(
                    {name: `Guild:`, value: `${guildMember.guild.name}`, inline: true},
                    {name: `Reason:`, value: `${row[0].reason}`},
                  )
                  .setTimestamp()
                  .setFooter(`${config["main_config"].copyright}`)
                  client.users.cache.get(`${guildMember.user.id}`, async theuser => {
                    await theuser.send(getBeamed).then(msg => {
                      console.log(`Message was sent to ${guildMember.user.tag}`)
                    }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                  });

              try {

                setTimeout(function(){

                    theguild.members.ban(`${guildMember.user.id}`, {
                        reason: `${row[0].reason}`
                    }).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    console.log(`I have banned: ${guildMember.user.tag} as they are in the Offline Bans Database.`)

                }, 3500)

                await con.query(`SELECT * FROM users WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                  let curcount = row[0].bans + 1
                  await con.query(`UPDATE users SET bans='${curcount}' WHERE userid='${guildMember.user.id}'`, async (err, row) => {});
                });

              } catch(e) {
                if(config["main_config"].debugmode) return console.log(e);
              }
        }
    });

    if(config["altprev_config"].enabled) {

        if(config["altprev_config"].banalts) {
            const banstatus = "banned"
    
            if(guildMember.user.bot) {
                console.log("Alt Prevention Bypass accepted, Reason: User is a bot.")
            } else {

                // Alt Prevention Code Listed Here        --------------------------       is the math that matches up to 10 days.
                if (Date.now() - guildMember.user.createdAt < config["altprev_config"].timelimit) {

                    if(config["logging_config"].enable_altprev_logging) {
                        config["logging_config"].altprev_logging_channels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new Hyperz.MessageEmbed()
                                .setColor(`${config.logging_config.altprev_logs_color || config.main_config.colorhex}`)
                                .setTitle(`Alt Account Detected!`)
                                .setThumbnail(`${guildMember.user.avatarURL({dynamic: true})}`)
                                .addFields(
                                    {name: `User ID:`, value: `${guildMember.user.id}`, inline: true},
                                    {name: `User Tag:`, value: `${guildMember.user.tag}`, inline: true},
                                    {name: `Action:`, value: `${banstatus}`, inline: true},
                                    {name: `Creation Date:`, value: `${guildMember.user.createdAt.toLocaleString()}`},
                                )
                                .setTimestamp()
                                .setFooter(`${config["main_config"].copyright}`)
                                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                    }

                    if(config["altprev_config"].dmalts) {
                        try {
                        const embed = new Hyperz.MessageEmbed()
                        .setTitle("Alt Account Detected!")
                        .setColor(`${config.logging_config.altprev_logs_color || config.main_config.colorhex}`)
                        .setDescription(`${config.altprev_config.dmmessage}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                        guildMember.send(embed).then(test => {
                            if(config["altprev_config"].banalts) {
                                theguild.members.ban(`${guildMember.user.id}`, {
                                    reason: `Alt Account Detected. - ${client.user.username}`
                                });
                            } else theguild.member(guildMember.user.id).kick(`Alt Account`)
                        }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        } catch(e) {
                            console.error(e)
                        }

                    } else {
                        if(config["altprev_config"].banalts) {
                            theguild.members.ban(`${guildMember.user.id}`, {
                                reason: `Alt Account Detected. - ${client.user.username}`
                            });
                        } else theguild.member(guildMember.user.id).kick(`Alt Account`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    }
                }
            }
        } else {
            const banstatus = "kicked"
    
            if(guildMember.user.bot) {
                console.log("Alt Prevention Bypass accepted, Reason: User is a bot.")
            } else {

                // Alt Prevention Code Listed Here        --------------------------       is the math that matches up to 10 days.
                if (Date.now() - guildMember.user.createdAt < config["altprev_config"].timelimit) {
                    
                    if(config["logging_config"].enable_altprev_logging) {
                        config["logging_config"].altprev_logging_channels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                const logembed = new Hyperz.MessageEmbed()
                                .setColor(`${config.logging_config.altprev_logs_color || config.main_config.colorhex}`)
                                .setTitle(`Alt Account Detected!`)
                                .setThumbnail(`${guildMember.user.avatarURL({dynamic: true})}`)
                                .addFields(
                                    {name: `User ID:`, value: `${guildMember.user.id}`, inline: true},
                                    {name: `User Tag:`, value: `${guildMember.user.tag}`, inline: true},
                                    {name: `Action:`, value: `${banstatus}`, inline: true},
                                    {name: `Creation Date:`, value: `${guildMember.user.createdAt.toLocaleString()}`},
                                )
                                .setTimestamp()
                                .setFooter(`${config["main_config"].copyright}`)
                                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                    }

                    if(config["altprev_config"].dmalts) {
                        try {
                        const embed = new Hyperz.MessageEmbed()
                        .setTitle("Alt Account Detected!")
                        .setColor(`${config.logging_config.altprev_logs_color || config.main_config.colorhex}`)
                        .setDescription(`${config.altprev_config.dmmessage}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                        guildMember.send(embed).then(test => {
                            if(config["altprev_config"].banalts) {
                                theguild.members.ban(`${guildMember.user.id}`, {
                                    reason: `Alt Account Detected. - ${client.user.username}`
                                });
                            } else theguild.member(guildMember.user.id).kick(`Alt Account`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        })
                        } catch(e) {
                            console.error(e)
                        }

                    } else {
                        if(config["altprev_config"].banalts) {
                            theguild.members.ban(`${guildMember.user.id}`, {
                                reason: `Alt Account Detected. - ${client.user.username}`
                            });
                        } else theguild.member(guildMember.user.id).kick(`Alt Account`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    }
                }
            }
        }
    }
    }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}