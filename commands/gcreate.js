const ms = require('ms');
module.exports = {
    name: 'gcreate',
    description: 'Giveaway System.',
    aliases: ['cgiveaway', 'startgiveaway'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            const per = config["permissions_config"].giveawayperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

                if(config.giveaways_config.enabled) {

                    if(!args[2]) return message.channel.send(`Error: Wrong Format, Try: \`${config.main_config.prefix}gcreate 2d 1 Awesome Prize!\``).then(msg => {
                        msg.delete({ timeout: 14000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    });

                    client.giveawaysManager.start(message.channel, {
                        time: ms(args[0]),
                        winnerCount: parseInt(args[1]),
                        prize: args.slice(2).join(' '),
                        messages: {
                            giveaway: `${config["giveaways_config"].startgiveawaymessage}`,
                            giveawayEnded: `${config["giveaways_config"].startgiveawaymessage}`,
                            embedFooter: `${config["main_config"].copyright}`,
                        }
                    });

                } else {
                    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                }

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

