const ms = require("ms");

module.exports = {
    name: 'mute',
    description: 'Mute a member.',
    aliases: ['silence', 'shush', 'shutup', 'shut'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

    if(config["moderation_config"].enabled) {

        const per = config["permissions_config"].staffperms
        if(message.member.roles.cache.some(h=>per.includes(h.id))){
        
        var somereas;

        if(args[1]) {
            somereas = args.slice(2).join(" ")
        } else {
            somereas = "N/A"
        }

        const target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (target) {
            let tid = target.user.id
            const deMuteRole = config["moderation_config"].mutedroleid
                if(target.roles.cache.find(role => role.id === deMuteRole)) {

                    message.channel.send("That user is already muted...").then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

                } else {

                    try {

                        if(!args[1]){
                            return message.channel.send("You didnt specify a time!").then(msg => {
                                msg.delete({ timeout: 12000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                            });
                        } else {

                        let time = args[1]

                        target.roles.add(deMuteRole);

                        await con.query(`SELECT * FROM users WHERE userid='${tid}'`, async (err, row) => {
                            await con.query(`UPDATE users SET mutes = mutes + 1 WHERE userid='${tid}'`, async (err, row) => {});
                            await con.query(`UPDATE users SET isMuted = 'true' WHERE userid='${tid}'`, async (err, row) => {});
                            await con.query(`UPDATE users SET muteTime = '${time}' WHERE userid='${tid}'`, async (err, row) => {});
                        });

                        await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                            let uniqueid = row[0].total + 1
                            let refinedreason = somereas.replace("'", "").replace("`", "")
                            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${tid}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Mute')`, async (err, row) => {
                                if(err) throw err;
                            });
                        });

                        if(config["logging_config"].enable_punishment_logging) {

                            config["logging_config"].punishment_logging_channels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new Hyperz.MessageEmbed()
                                    .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                        .setAuthor(`Action Logs - User Muted`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `Enforcer:`, value: `${message.author.tag}`},
                                            {name: `User ID:`, value: `${tid}`},
                                            {name: `User Tag:`, value: `${target.user.tag}`},
                                            {name: `Reason:`, value: `${somereas}`},
                                            {name: `Time:`, value: `${time}`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${config["main_config"].copyright}`)
                                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                                }
                            
                            }); 
                    
                        }

                        const getBeamed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`${target.user.username} was muted!`)
                        .setDescription(`They will be unmuted after the time is up!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                        message.channel.send(getBeamed).then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                        try {

                            const dmEmbed = new Hyperz.MessageEmbed()
                            .setColor(config["main_config"].colorhex)
                            .setTitle(`⚠️ You've Been Muted! ⚠️`)
                            .addFields(
                                {name: `Muted By:`, value: `${message.author.tag}`},
                                {name: `Expiration:`, value: `${time}`},
                            )
                            .setTimestamp()
                            .setFooter(`${config["main_config"].copyright}`)
                        
                            target.send(dmEmbed).then(msg => {
                                message.channel.send(`I have successfully alerted the user privately.`).then(mesg => {mesg.delete({ timeout: 9000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                            });
                            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        
                        } catch(e) {
                            if(config["main_config"].debugmode) return console.log(e);
                        }

                        setTimeout(async function(){
                
                            target.roles.remove(deMuteRole);
                                const getunBeamed = new Hyperz.MessageEmbed()
                                .setColor(`${config["main_config"].colorhex}`)
                                .setTitle(`${target.user.username} was un-muted!`)
                                .setDescription(`They are officially allowed to speak again!`)
                                .setTimestamp()
                                .setFooter(`${config["main_config"].copyright}`)

                                message.channel.send(getunBeamed).then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                                try {

                                    const dmEmbed = new Hyperz.MessageEmbed()
                                    .setColor(config["main_config"].colorhex)
                                    .setTitle(`⚠️ You've Been Un-Muted! ⚠️`)
                                    .setDescription(`We __encourage__ you to watch your behavior next time!`)
                                    .setTimestamp()
                                    .setFooter(`${config["main_config"].copyright}`)
                                
                                    target.send(dmEmbed)

                                    await con.query(`UPDATE users SET isMuted = 'false' WHERE userid='${tid}'`, async (err, row) => {});
                                    await con.query(`UPDATE users SET muteTime = '0' WHERE userid='${tid}'`, async (err, row) => {});
                
                                } catch(e) {
                                   if(config["main_config"].debugmode) return console.log(e);
                                }

                        }, ms(time));
                    }

                    } catch(e) {
                       if(config["main_config"].debugmode) return console.log(e);
                    }
            }

        } else {
            message.channel.send('I couldnt find that user...').then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}
    } else {
        message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
    },
}