module.exports = {
    name: 'reviver',
    description: 'Sends a message to try to revive a channel.',
    aliases: ['revive', 'deadchat', 'reschat'],
    async execute(client, message, args, Hyperz, config, con){

        try {

        if(message.guild.id === config["main_config"].yourserverid) {

        if(config["other_configuration"].useReviver) {

            const per = config["permissions_config"].revivechatperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

                const revives = config["other_configuration"].reviver_messages
                const datRole = config["other_configuration"].deadChatPingsRoleID
                let res = revives[Math.floor(revives.length * Math.random())];
                

                    if(!datRole) {

                        const reviveEmbed = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`Reviver's topic is:`)
                        .setDescription(`${res}`)
                        .setThumbnail(`${config["other_configuration"].reviverlogourl || client.user.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                    
                        message.channel.send(reviveEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

                    } else {

                        const reviveEmbed = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`Reviver's topic is:`)
                        .setDescription(`${res}`)
                        .setThumbnail(`${config["other_configuration"].reviverlogourl || client.user.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                    
                        message.channel.send(reviveEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.channel.send(`<@&${datRole}>`).then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

                    }


            } else {
                message.channel.send(`You don't have the required roles to use this command.`).then(msg => msg.delete({ timeout: 14000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e)})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }

        } else {
            message.channel.send(`This module is disabled.`).then(msg => msg.delete({ timeout: 14000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e)})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }

        } else {
            message.channel.send(`This command can only be ran inside of the main server!`).then(msg => msg.delete({ timeout: 14000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e)})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
    } catch(e) {
        if(config["main_config"].debugmode) return console.log(e);
    }
    },
}