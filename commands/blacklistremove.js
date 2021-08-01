
module.exports = {
    name: 'blacklistremove',
    description: 'Removes a user from the blacklist role.',
    aliases: ['removeblacklist', 'unblacklist'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            const per = config["permissions_config"].blacklistperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(config["other_configuration"].enableBlacklisting) {

        const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        const deRole = config["other_configuration"].blacklistedRoleID
        const goodboirole = config["other_configuration"].roleToGiveWhenUnBlacklisted

        if(pingeduser) {

                pingeduser.roles.remove(deRole)
                pingeduser.roles.add(goodboirole)


                try {

                    const roleEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`You Were Un-Blacklisted!`)
                    .setDescription(`You were unblacklisted from the server!`)
                    .setThumbnail(`${config["other_configuration"].removeBlacklistImageURL}` || guildMember.user.avatarURL || guildMember.guild.iconURL({dynamic: true}))
                    .setFooter(`${config["main_config"].copyright}`)
                
                    pingeduser.send(roleEmbed)
                    message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});

                } catch(e) {
                    if(config["main_config"].debugmode) return console.log(e);
                }

                config["other_configuration"].logBlacklistsChannels.forEach(chan => {
    
                    const thechannel = client.channels.cache.get(chan)
                    if(!thechannel) {
                        console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                    } else {
                        const logembed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`Blacklist Entry Revoked!`)
                        .setDescription(`**User Tag:** ${pingeduser.user.tag}\n**User ID:** ${pingeduser.user.id}\n \n**Update:** \`The blacklist placed on this user was revoked!\``)
                        .setThumbnail(`${config["other_configuration"].removeBlacklistImageURL}` || guildMember.user.avatarURL || guildMember.guild.iconURL({dynamic: true}))
                        .setFooter(`${config["main_config"].copyright}`)
                        thechannel.send(logembed)
                    }
                
                });

    } else {
        message.channel.send(`I was unable to find that user.`).then(msg => {msg.delete({ timeout: 12000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
    }
} else {
    message.channel.send(`This module is disabled.`).then(msg => {msg.delete({ timeout: 14000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
}
    } else {
        message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
    }
        } else {
            message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
        }
    },
}