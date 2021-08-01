module.exports = {
    name: 'dm',
    description: 'Messages a user.',
    aliases: ['pm', 'message', 'directmessage', 'privatemessage'],
    async execute(client, message, args, Hyperz, config, con){

    if(message.guild.id === config["main_config"].yourserverid) {

        if(config["moderation_config"].enable_dm_command) {

            const per = config["permissions_config"].staffperms
        if(message.member.roles.cache.some(h=>per.includes(h.id))){
        
            const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!pingeduser) return message.channel.send(`I couldn't find that user's avatar...`).then(msg => {
                msg.delete({timeout: 9000}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
            });

            try {
            if(config["moderation_config"].dm_command_use_embeds) {

                const embed = new Hyperz.MessageEmbed()
                .setColor(`${config["main_config"].colorhex}`)
                .setTitle(`Alert From ${config["main_config"].yourservername} Staff:`)
                .setDescription(`${args.slice(1).join(" ")}`)
                .setTimestamp()
                .setFooter(`${config["main_config"].copyright}`)

                pingeduser.send(embed) || message.guild.members.cache.get(pingeduser).send(embed)
                message.channel.send("I have sent the message.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
            } else {
                pingeduser.send(`**Alert From ${config["main_config"].yourservername}:** ${args.slice(1).join(" ")}`) || message.guild.members.cache.get(pingeduser).send(`**Alert From ${config["main_config"].yourservername}:** ${args.slice(1).join(" ")}`)
                message.channel.send("I have sent the message.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
            }
        } catch(e) {
            if(config["main_config"].debugmode) return console.log(e);
        }

        } else {
            message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }

        }
        
    } else {
        message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }

    

    },
}