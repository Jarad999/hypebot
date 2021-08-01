const ms = require('ms');
module.exports = {
    name: 'greroll',
    description: 'Giveaway System.',
    aliases: ['rgiveaway', 'rerollgiveaway'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            const per = config["permissions_config"].giveawayperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

                if(config.giveaways_config.enabled) {

                    if(!args[0]) return message.channel.send(`Error: Wrong Format, Try: \`${config.main_config.prefix}greroll <giveawayMessageID>\``).then(msg => {
                        msg.delete({ timeout: 14000 }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                    });

                    const messageID = args[0];

                    client.giveawaysManager.reroll(messageID).then(() => {
                        message.channel.send('Success! Giveaway rerolled!');
                    }).catch((err) => {
                        message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
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

