const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, oldUser, newUser) =>{

    try {

        if(config["logging_config"].enable_user_update_logging) {

            config["logging_config"].user_update_logging_channels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {

                    var logembed;

                    if(oldUser.displayAvatarURL() != newUser.displayAvatarURL()) {

                        logembed = new Hyperz.MessageEmbed()
                        .setColor(`${config.logging_config.user_update_logs_color || config.main_config.colorhex}`)
                        .setAuthor(`Action Logs - User Updated`, client.user.displayAvatarURL())
                        .setDescription(`${newUser.tag} has updated their avatar.`)
                        .setImage(`${newUser.displayAvatarURL({ dynamic: true })}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                        await thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                    } else {

                        logembed = new Hyperz.MessageEmbed()
                        .setColor(`${config.logging_config.user_update_logs_color || config.main_config.colorhex}`)
                        .setAuthor(`Action Logs - User Updated`, client.user.displayAvatarURL())
                        .setThumbnail(`${newUser.displayAvatarURL({ dynamic: true })}`)
                        .addFields(
                            {name: `Actioned By:`, value: `${newUser.tag || "someone"}`},
                            {name: `Before Changes:`, value: `\`Tag:\` ${oldUser.tag}\n\`ID:\` ${oldUser.id}\n\`Username:\` ${oldUser.username}\n\`#:\` ${oldUser.discriminator}`},
                            {name: `After Changes:`, value: `\`Tag:\` ${newUser.tag}\n\`ID:\` ${newUser.id}\n\`Username:\` ${newUser.username}\n\`#:\` ${newUser.discriminator}`},
                        )
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                        await thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                    }
                }
            
            });

            }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}