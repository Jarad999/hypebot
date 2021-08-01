module.exports = {
    name: 'supportmember',
    description: 'A Command.',
    aliases: ['msupport', 'support', 'usesupport', 'usesupportchannels', 'usesupportchans', 'supportchans', 'gethelphere'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

        if(config["assistant_config"].enabled) {

            if(config["assistant_config"].useSupportCommands) {

                const per = config["permissions_config"].assistantmanagers
                if(message.member.roles.cache.some(h=>per.includes(h.id))){

                message.channel.send(config["assistant_config"].memberSupportMessage).then(msg => {msg.delete({ timeout: 40000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                } else {
                    message.channel.send("You don't have permission to use this command.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                }

            } else {
                message.channel.send("This command is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
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
    },
}