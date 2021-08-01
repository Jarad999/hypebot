const ms = require('ms');
module.exports = {
    name: 'slowmode',
    description: 'A Command.',
    aliases: ['slowmo', 'setslowmode', 'setslowmo'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            const per = config["permissions_config"].staffperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

                    if(!args[0]) return message.channel.send(`Error: Wrong Format, Try: \`${config.main_config.prefix}slowmode 5\``).then(msg => {
                        msg.delete({ timeout: 14000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    });
    
                    message.channel.setRateLimitPerUser(args[0] , `Set by ${message.author.tag}`);
                    message.channel.send(`Slowmode has been set!`).then(msg => msg.delete({ timeout: 14000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

            } else {
                message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
            }

        } else {
            message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
        }

    }
}

