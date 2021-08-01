const guildMemberRemove = require("../events/guild/guildMemberRemove");

module.exports = {
    name: 'blacklistadd',
    description: 'Adds a user to the blacklist role.',
    aliases: ['addblacklist', 'blacklist'],
    async execute(client, message, args, Hyperz, config, con){

    try {

        if(message.guild.id === config["main_config"].yourserverid) {

            const per = config["permissions_config"].blacklistperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(config["other_configuration"].enableBlacklisting) {

        const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        const deRole = config["other_configuration"].blacklistedRoleID

        if(pingeduser) {

            message.channel.send(`Processing Blacklist...`).then(msg => {msg.delete({ timeout: 1500 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

            try {
                pingeduser.roles.cache.forEach(r => {
                    pingeduser.roles.remove(r, {timeout: 2000})
                });
                console.log(`------ Ignore Errors Thrown Here ------`)
            } catch(e) {
                if(config["main_config"].debugmode) return console.log(e);
            }

            setTimeout(function(){
                pingeduser.roles.add(deRole)
            }, 2500);

            if(!args[1]) {

                    try {

                        const roleEmbed = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`You Were Blacklisted! 🤡`)
                        .setDescription(`You were blacklisted for the reason: N/A\n*If you leave the server, you will be auto-banned.*`)
                        .setThumbnail(`${config["other_configuration"].addBlacklistImageURL}` || guildMember.user.avatarURL || guildMember.guild.iconURL({dynamic: true}))
                        .setFooter(`${config["main_config"].copyright}`)
                    
                        pingeduser.send(roleEmbed)
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

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
                            .setTitle(`🤡  New Blacklist Entry!`)
                            .setDescription(`**User Tag:** ${pingeduser.user.tag}\n**User ID:** ${pingeduser.user.id}\n \n**Reason:** \`No reason was entered.\``)
                            .setThumbnail(`${config["other_configuration"].addBlacklistImageURL}` || guildMember.user.avatarURL || guildMember.guild.iconURL({dynamic: true}))
                            .setFooter(`If they leave the server they will be banned.`)
                            thechannel.send(logembed)
                        }
                    
                    });
                    console.log(`------ Ignore Errors Thrown Here ------`)
            } else {

                try {
                    const roleEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`You Were Blacklisted! 🤡`)
                    .setDescription(`You were blacklisted for the reason(s):\n **${args.slice(1).join(" ")}**\n \n*If you leave the server, you will be auto-banned.*`)
                    .setThumbnail(`${config["other_configuration"].addBlacklistImageURL}` || guildMember.user.avatarURL || guildMember.guild.iconURL({dynamic: true}))
                    .setFooter(`${config["main_config"].copyright}`)
                
                    pingeduser.send(roleEmbed)
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

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
                        .setTitle(`🤡  New Blacklist Entry!`)
                        .setDescription(`**User Tag:** ${pingeduser.user.tag}\n**User ID:** ${pingeduser.user.id}\n \n**Reason:** \`${args.slice(1).join(" ")}\``)
                        .setThumbnail(`${config["other_configuration"].addBlacklistImageURL}` || guildMember.user.avatarURL || guildMember.guild.iconURL({dynamic: true}))
                        .setFooter(`If they leave the server they will be banned.`)
                        thechannel.send(logembed)
                    }
                
                });
                console.log(`------ Ignore Errors Thrown Here ------`)

            }
    } else {
        message.channel.send(`I was unable to find that user.`).then(msg => {msg.delete({ timeout: 12000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    }
} else {
    message.channel.send(`This module is disabled.`).then(msg => {msg.delete({ timeout: 14000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
            } else {
                message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }
        } else {
            message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
    },
}