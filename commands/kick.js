module.exports = {
    name: 'kick',
    description: 'A command.',
    aliases: ['remove', 'kik'],
    async execute(client, message, args, Hyperz, config, con){

        const member = message.member

        if (member.hasPermission('KICK_MEMBERS')) {

            let server = message.guild;
            let kickedmember = message.mentions.users.first().id;
            let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

            try {
                
                if(!args[1]) {

                    const kickEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                    .setTitle(`Kick Successful`)
                    .setDescription('I have kicked that member in this server.')
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                
                    message.channel.send(kickEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                    const dmEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`⚠️ You've Been Kicked! ⚠️`)
                    .addFields(
                        {name: `Kicked By:`, value: `${message.author.tag}`, inline: true},
                        {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                        {name: `Reason:`, value: `No reason provided...`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                
                    target.send(dmEmbed)

                    setTimeout(async function(){
                        server.member(kickedmember).kick()
                        await con.query(`SELECT * FROM users WHERE userid='${kickedmember}'`, async (err, row) => {
                            await con.query(`UPDATE users SET kicks = kicks + 1 WHERE userid='${kickedmember}'`, async (err, row) => {});
                        });

                        await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                            let uniqueid = row[0].total + 1
                            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${kickedmember}', 'No reason provided.', '${uniqueid}', '${message.author.id}', 'Kick')`, async (err, row) => {});
                        });

                        if(config["logging_config"].enable_punishment_logging) {

                            config["logging_config"].punishment_logging_channels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new Hyperz.MessageEmbed()
                                    .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                        .setAuthor(`Action Logs - User Kicked`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `Enforcer:`, value: `${message.author.tag}`},
                                            {name: `User ID:`, value: `${kickedmember}`},
                                            {name: `User Tag:`, value: `${target.user.tag}`},
                                            {name: `Reason:`, value: `No reason provided`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${config["main_config"].copyright}`)
                                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                                }
                            
                            }); 
                    
                        }

                    }, 2500)

                } else {

                    const kickEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                    .setTitle(`Kick Successful`)
                    .setDescription('I have kicked that member in this server.')
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                
                    message.channel.send(kickEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                    const dmEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`⚠️ You've Been Kicked! ⚠️`)
                    .addFields(
                        {name: `Kicked By:`, value: `${message.author.tag}`, inline: true},
                        {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                        {name: `Reason:`, value: `${args.slice(1).join(" ")} `},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                
                    target.send(dmEmbed).then(msg => {
                        message.channel.send(`I have successfully alerted the user privately.`).then(mesg => {mesg.delete({ timeout: 9000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    });

                    setTimeout(async function(){
                        server.member(kickedmember).kick()
                        await con.query(`SELECT * FROM users WHERE userid='${kickedmember}'`, async (err, row) => {
                            let curcount = row[0].kicks + 1
                            await con.query(`UPDATE users SET kicks='${curcount}' WHERE userid='${kickedmember}'`, async (err, row) => {});
                        });

                        await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                            let uniqueid = row[0].total + 1
                            let refinedreason = args.slice(1).join(" ").replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${kickedmember}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Kick')`, async (err, row) => {});
                        });

                        if(config["logging_config"].enable_punishment_logging) {

                            config["logging_config"].punishment_logging_channels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new Hyperz.MessageEmbed()
                                    .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                                        .setAuthor(`Action Logs - User Kicked`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `Enforcer:`, value: `${message.author.tag}`},
                                            {name: `User ID:`, value: `${kickedmember}`},
                                            {name: `User Tag:`, value: `${target.user.tag}`},
                                            {name: `Reason:`, value: `${args.slice(1).join(" ")}`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${config["main_config"].copyright}`)
                                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                                }
                            
                            }); 
                    
                        }

                    }, 2500)

                }

                // end of command shit here lol
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

            } catch(e) {
                if(config["main_config"].debugmode) return console.log(e);
            }
        }
    },
}
