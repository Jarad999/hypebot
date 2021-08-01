const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, guildMember) => {

    try {

    if(guildMember.guild.id === config["main_config"].yourserverid) {

    if(config["other_configuration"].enableBlacklisting) {
        const blacklistedroles = config["other_configuration"].blacklistedRoleID
        if(guildMember.roles.cache.some(h=>blacklistedroles.includes(h.id))){
            
            try {

                guildMember.guild.members.ban(`${guildMember.user.id}`, {
                    reason: `Banned due to user's active Shadow Ban. - ${client.user.username}`
                });

                const leEmbed = new Hyperz.MessageEmbed()
                .setColor(`${config["main_config"].colorhex}`)
                .setTitle(`Ban Enforced!`)
                .setDescription(`**User Tag:** ${guildMember.user.tag}\n**User ID:** ${guildMember.user.id}\n \n**Reason:** \`Shadow Banned.\``)
                .setThumbnail(`${config["other_configuration"].autoBanImageURL}` || guildMember.guild.iconURL({dynamic: true}))
                .setFooter(`${config["main_config"].copyright}`)

                    config["other_configuration"].logBlacklistsChannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(leEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });

            } catch(e) {

                if(config["main_config"].debugmode) return console.log(e);

            }

        }
    }
    
    if(config.leveling_config.enabled) {
        if(config.leveling_config.clearUsersOnLeave) {
            await con.query(`SELECT * FROM chatlvl WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    await con.query(`DELETE FROM chatlvl WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                        if(err) throw err;
                    });
                }
            });
        }
    }

    if(config["new_user_config"].enabled){

        if(config["new_user_config"].useservername) {

                if(config["new_user_config"].useleavemessage) {

                    if(config["new_user_config"].useembeds) {
                    const embed = new Hyperz.MessageEmbed()
                    .setColor(`${config["main_config"].colorhex}`)
                    .setTitle(`${config["new_user_config"].userleaveheader}`)
                    .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas left ${config["main_config"].yourservername}!`)
                    .addFields(
                        {name: `Notice:`, value: `${config["new_user_config"].userleavemessage}`}
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    config["new_user_config"].userleavechannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                } else {

                    config["new_user_config"].userleavechannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has left ${config["main_config"].yourservername}! ${config["new_user_config"].userleavemessage}`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                    
                }
                } else {

                    if(config["new_user_config"].useembeds) {
                        const embed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`${config["new_user_config"].userleaveheader}`)
                        .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas left ${config["main_config"].yourservername}!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
    
                        config["new_user_config"].userleavechannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                    } else {
    
                        config["new_user_config"].userleavechannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has left ${config["main_config"].yourservername}!`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                        
                    }

                }
        } else {

                if(config["new_user_config"].useleavemessage) {

                    if(config["new_user_config"].useembeds) {
                    const embed = new Hyperz.MessageEmbed()
                    .setColor(`${config["main_config"].colorhex}`)
                    .setTitle(`${config["new_user_config"].userleaveheader}`)
                    .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas left the server!`)
                    .addFields(
                        {name: `Notice:`, value: `${config["new_user_config"].userleavemessage}`}
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)

                    config["new_user_config"].userleavechannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                } else {

                    config["new_user_config"].userleavechannels.forEach(chan => {

                        const thechannel = client.channels.cache.get(chan)
                        if(!thechannel) {
                            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                        } else {
                            thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has left the server! ${config["new_user_config"].userleavemessage}`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    
                    });
                    
                }
                } else {

                    if(config["new_user_config"].useembeds) {
                        const embed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`${config["new_user_config"].userleaveheader}`)
                        .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas left the server!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
    
                        config["new_user_config"].userleavechannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(embed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                    } else {
    
                        config["new_user_config"].userleavechannels.forEach(chan => {
    
                            const thechannel = client.channels.cache.get(chan)
                            if(!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(`<@${guildMember.user.id}> (${guildMember.user.tag}) has left the server!`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            }
                        
                        });
                        
                    }

                }
        }
    }
    }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}