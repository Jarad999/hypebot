module.exports = {
    name: 'say',
    description: 'A command.',
    aliases: ['echo', 'mock'],
    async execute(client, message, args, Hyperz, config, con){
        const per = config["permissions_config"].staffperms
    if(message.member.roles.cache.some(h=>per.includes(h.id))){

        if(!args[0]) {
            message.channel.send("You have to input something for me to say...").then(msg => {
                msg.delete({ timeout: 8000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            });
        } else {
            const sayMessage = args.join(" ")
            message.channel.send(sayMessage)
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }

    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}
    }
}
