const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, channel) =>{

    try {

    if(channel.type == 'dm') {
        // nothing here lol
    } else {

    if(channel.guild.id === config["main_config"].yourserverid) {

        if(config["logging_config"].enable_channel_logging) {

            config["logging_config"].channel_logging_channels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_DELETE"});
                    const Entry = AuditLogFetch.entries.first();
                    const logembed = new Hyperz.MessageEmbed()
                    .setColor(`${config.logging_config.channel_logs_color || config.main_config.colorhex}`)
                    .setAuthor(`Action Logs - Channel Deleted`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Channel ID:`, value: `${channel.id}`},
                        {name: `Channel Name:`, value: `${channel.name}`},
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