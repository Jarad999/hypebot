module.exports = {
    name: 'avatar',
    description: 'Sends an avatar.',
    aliases: ['avatarimg', 'logo'],
    async execute(client, message, args, Hyperz, config, con){

    const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!pingeduser) return message.channel.send(`I couldn't find that user's avatar...`).then(msg => {
        msg.delete({timeout: 9000}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        try {
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            } catch(e) {
                if(config["main_config"].debugmode) return console.log(e);
            }
    }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

            const embed = new Hyperz.MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setTitle(`${pingeduser.user.tag}'s Avatar:`)
            .setURL(`${config["other_configuration"].serverinvite}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
            .setImage(`${pingeduser.user.displayAvatarURL({dynamic: true})}`)
            .setTimestamp()
            .setFooter(`${config["main_config"].copyright}`)

            message.channel.send(embed).then(msg => msg.delete({ timeout: 22000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
}

