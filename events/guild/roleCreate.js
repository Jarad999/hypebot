const fs = require('fs');
const config = require('../../config.json');

module.exports = (client, Hyperz, config, con, role) => {

    try {

    if(role.guild.id === config["main_config"].yourserverid) {

        if(config["logging_config"].enable_role_logging) {

            config["logging_config"].role_logging_channels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_CREATE"});
                    const Entry = AuditLogFetch.entries.first();
                    const logembed = new Hyperz.MessageEmbed()
                    .setColor(`${config.logging_config.role_logs_color || config.main_config.colorhex}`)
                    .setAuthor(`Action Logs - Role Created`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Role ID:`, value: `${role.id}`},
                        {name: `Role Name:`, value: `${role.name}`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }
            
            });

        }
    }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}