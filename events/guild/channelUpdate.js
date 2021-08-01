const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, oldChannel, newChannel) =>{

    try {

        if(oldChannel.partial) await oldChannel.fetch().then(() => {
            console.log(`Old Channel Fetched`)
        });
        if(newChannel.partial) await newChannel.fetch().then(() => {
            console.log(`New Channel Fetched`)
        });

    if(newChannel.type == 'dm') {
        // nothing here lol
    } else {

    if(oldChannel.type == 'category') return;
    if(newChannel.type == 'category') return;
    if(!oldChannel.parent) return;
    if(!newChannel.parent) return;

    if(oldChannel.id === config.serverstats_config.membercountchannelid) return;
    if(oldChannel.id === config.serverstats_config.usercountchannelid) return;
    if(oldChannel.id === config.serverstats_config.botcountchannelid) return;

    if(oldChannel.name === newChannel.name) return;

    if(newChannel.guild.id === config["main_config"].yourserverid) {

        if(config["logging_config"].enable_channel_update_logging) {

            config["logging_config"].channel_update_logging_channels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await newChannel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_UPDATE"});
                    const Entry = AuditLogFetch.entries.first();
                    const logembed = new Hyperz.MessageEmbed()
                    .setColor(`${config.logging_config.channel_update_logs_color || config.main_config.colorhex}`)
                    .setAuthor(`Action Logs - Channel Updated`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Before Changes:`, value: `\`Name:\` ${oldChannel.name}\n\`Type:\` ${oldChannel.type}\n\`ID:\` ${oldChannel.id}\n\`Created:\` ${oldChannel.createdAt.toLocaleString()}`},
                        {name: `After Changes:`, value: `\`Name:\` ${newChannel.name}\n\`Type:\` ${newChannel.type}\n\`ID:\` ${newChannel.id}\n\`Created:\` ${newChannel.createdAt.toLocaleString()}`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }
            
            });

            }
        } else {
            console.log(`Channel updated, but not in your server.`)
        }
    }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}