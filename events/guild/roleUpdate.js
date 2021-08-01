const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, Hyperz, config, con, oldRole, newRole) =>{

    try {

    if(oldRole.guild.id === config["main_config"].yourserverid) {

        if(config["logging_config"].enable_role_update_logging) {

            config["logging_config"].role_update_logging_channels.forEach(async chan => {
    
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const AuditLogFetch = await newRole.guild.fetchAuditLogs({limit: 1, type: "ROLE_UPDATE"});
                    const Entry = AuditLogFetch.entries.first();
                    const logembed = new Hyperz.MessageEmbed()
                    .setColor(`${config.logging_config.role_update_logs_color || config.main_config.colorhex}`)
                    .setAuthor(`Action Logs - Role Updated`, client.user.displayAvatarURL())
                    .addFields(
                        {name: `Actioned By:`, value: `${Entry.executor.tag || "someone"}`},
                        {name: `Before Changes:`, value: `\`Name:\` ${oldRole.name}\n\`Color:\` ${oldRole.hexColor}\n\`ID:\` ${oldRole.id}\n\`Created:\` ${oldRole.createdAt.toLocaleString()}\n\`Position:\` ${oldRole.position}\n\`Hoisted:\` ${oldRole.hoist}\n\`Mentionable:\` ${oldRole.mentionable}\n\`Deleted:\` ${oldRole.deleted}`},
                        {name: `After Changes:`, value: `\`Name:\` ${newRole.name}\n\`Color:\` ${newRole.hexColor}\n\`ID:\` ${newRole.id}\n\`Created:\` ${newRole.createdAt.toLocaleString()}\n\`Position:\` ${newRole.position}\n\`Hoisted:\` ${newRole.hoist}\n\`Mentionable:\` ${newRole.mentionable}\n\`Deleted:\` ${newRole.deleted}`},
                    )
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                    await thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }
            
            });

            }
        } else {
            console.log(`Channel updated, but not in your server.`)
        }
} catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
}
}