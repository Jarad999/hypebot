module.exports = {
    name: 'tos',
    description: 'A command.',
    aliases: ['terms', 'gettos'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

        if(config["assistant_config"].enabled) {
            const per = config["permissions_config"].assistantmanagers
            if(message.member.roles.cache.some(h=>per.includes(h.id))){
                const tosEmbed = new Hyperz.MessageEmbed()
                .setColor(config["main_config"].colorhex)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                .setThumbnail(message.guild.iconURL({dynamic: true}))
                .addFields(
                    { name: 'Terms Of Service:', value: `**${config["assistant_config"].tosLink}**`},
                    { name: 'Notice:', value: 'Please type `"I agree"` to accept the ToS and move forward.'},
                )
                .setTimestamp()
                .setFooter(`${config["main_config"].copyright}`)
                
                message.channel.send(tosEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}
    
} else {
    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}

} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
}
}

// Credits:
// Physical Programming: Hyperz#0001
