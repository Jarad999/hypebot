module.exports = {
    name: 'review',
    description: 'A command.',
    aliases: ['rate', 'leavereview'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

        if(config["assistant_config"].enabled) {
            if(!args[0]) {
                message.channel.send("Review formatted incorrectly, proper format: `review <# of stars> <message>`").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            } else {
    const reviewEmbed = new Hyperz.MessageEmbed()
    .setColor(config["main_config"].colorhex)
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
    .addFields(
        { name: 'Review:', value: `${args.slice(1).join(" ")} `, inline: true},
        { name: 'Rating:', value: `${args.join(" ")[0]} ⭐'s`, inline: true},
    )
    .setTimestamp()
    .setFooter(`${config["main_config"].copyright}`)
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    config["assistant_config"].reviewschannelids.forEach(chan => {

        const thechannel = client.channels.cache.get(chan)
        if(!thechannel) {
            console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
        } else {
            thechannel.send(reviewEmbed).then(msg => {
                msg.react('❤️')
            });
        }
    
    });
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
