module.exports = {
    name: 'ticketopen',
    description: 'A command.',
    aliases: ['new', 'newticket', 'ticket'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            try {

                const guild = client.guilds.cache.get(config.main_config.yourserverid)

                var max = config.tickets_config.maxtickets
                var bruh = 0
                    
                await guild.channels.cache.forEach(c => {
                    if(c.name === `ticket-${message.author.username.toLowerCase()}`) {
                    bruh = bruh + 1
                    }
                });

                if(bruh >= max) return message.channel.send(`You may only have **${max} ticket(s)** open at a time.`).then(msg => {
                    msg.delete({ timeout: 3000 })
                    message.delete()
                    bruh = 0
                }).catch(e => { if(config.main_config.debugmode) return console.log(e); });

                bruh = 0

            } catch(e) {
                console.log(e)
            }
        
        const origin = message
        if (config["tickets_config"].enabled == true) {
            let everyoneRole = message.guild.roles.cache.find(role => role.name === "@everyone");
            let permissionOverwriteArray = [{
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: everyoneRole.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: client.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
            ]
            config.permissions_config.ticketmanagers.forEach(role => {
                let yeet = message.guild.roles.cache.get(role);
                if (!yeet) {
                    console.log(`${role} is not in the server`)
                } else {
                    let tempArray = {
                        id: role,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }
                    permissionOverwriteArray.push(tempArray);
                }
            })
            let hello = await message.guild.channels.create(`ticket-${message.author.username}`, {
                type: 'text',
                permissionOverwrites: permissionOverwriteArray
            }).catch(e => {
                 
                if (e) console.log(`I was not able to make a channel in  ${message.guild.id} || ${message.guild.name}`);
                origin.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            }).then(chan => {
                if (message.content.includes(" ")) {
                if(config["tickets_config"].usecategory = true){
                chan.setParent(config["tickets_config"].ticketscategoryid, {lockPermissions: false})
                chan.overwritePermissions(permissionOverwriteArray)
                }
                chan.setTopic(`Ticket for ${message.author.username}`)
                const ticketchannelembed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`Ticket:`)
                    .setURL(`${config["other_configuration"].serverinvite}`)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    .setDescription(config["tickets_config"].newticketmessage)
                    .addFields(
                        { name: 'Reason:', value: `${args.join(" ")}`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
    
                chan.send(ticketchannelembed)
                if(config.tickets_config.pingRoleOnTicketOpen) {
                    chan.send(`<@&${config.tickets_config.roleIdToPing}>`)
                }
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                } else if (message.content = `${config["main_config"].prefix}ticket`){ chan.setParent(config["tickets_config"].ticketscategoryid)
                chan.overwritePermissions(permissionOverwriteArray)
                chan.setTopic(`Ticket for ${message.author.username}`)
                const ticketchannelembed2 = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`Ticket:`)
                    .setURL(`${config["other_configuration"].serverinvite}`)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    .setDescription(config["tickets_config"].newticketmessage)
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
    
                chan.send(ticketchannelembed2)
                if(config.tickets_config.pingRoleOnTicketOpen) {
                    chan.send(`<@&${config.tickets_config.roleIdToPing}>`)
                }
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }
                message.channel.send(`Your new ticket has been opened in <#${chan.id}>`).then(msg => msg.delete({ timeout: 30000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            })
            if (hello == undefined) return;
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

        } else {
            message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
    } else {
        message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {console.log(e)})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
    }
}

/* Credits:
 Physical Programming: Hyperz#0001 & NAT2K15#2951
 I love NAT2K15#2951
*/
