module.exports = {
    name: 'ticketrename',
    description: 'A command.',
    aliases: ['renameticket', 'rename'],
    async execute(client, message, args, Hyperz, config, con){

        try {
                if(message.guild.id != config["main_config"].yourserverid) return message.channel.send(`This command must be ran in the main guild...`).then(msg => {
                    msg.delete({ timeout: 9000 })
                    message.delete()
                }).catch(e => {});

                const per = config["permissions_config"].ticketmanagers
                if(message.member.roles.cache.some(h=>per.includes(h.id))){

                if(config["tickets_config"].enabled) {
                    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You're not in a ticket channel.`).then(msg => msg.delete({timeout: 10000})).catch();
                    message.channel.setName(`ticket-${args.join(" ").replace(" ", "-").toLowerCase()}`)
                    message.channel.send(`I have renamed this ticket to \`ticket-${args.join(" ").replace(" ", "-").toLowerCase()}\``).catch();
                } else {
                    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                }
            } else {
                message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }
        } catch(e) {
            if(config.main_config.debugmode) return console.log(e);
        }
    },
}
