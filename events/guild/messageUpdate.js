const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, message, newMessage) =>{

    try {

    if (message.partial) await message.fetch();

    if(!message.guild) return;

    if(message.guild.id === config["main_config"].yourserverid) {

    if(message.author.bot) {
        // Dont want spammmmmm
    } else {

    if(config["logging_config"].enable_deleted_messages_logging) {

        config["logging_config"].edited_messages_channels.forEach(async chan => {
    
            const thechannel = client.channels.cache.get(chan)
            if(!thechannel) {
                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
            } else {
                const logembed = new Hyperz.MessageEmbed()
                .setColor(`${config.logging_config.edited_messages_logs_color || config.main_config.colorhex}`)
                    .setAuthor(`Action Logs - Message Updated`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `User:`, value: `${message.author.tag} - (${message.author.id})`},
                        {name: `Channel:`, value: `<#${message.channel.id}>`},
                        {name: `Before Changes:`, value: `${message.content}`},
                        {name: `After Changes:`, value: `${newMessage.content}`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            }
        
        });

    }
}
}
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}