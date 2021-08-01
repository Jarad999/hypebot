module.exports = {
    name: 'case',
    description: 'Check a warning case.',
    aliases: ['warns', 'cases', 'kicks', 'bans', 'mutes', 'punishment', 'casesearch', 'search'],
    async execute(client, message, args, Hyperz, config, con){

    try {

        if(!args[0]) return message.channel.send(`Please include a case ID to check...`).then(msg => {
            msg.delete({timeout: 10000})
            message.delete()
        }).catch(e => {});

        await con.query(`SELECT * FROM cases WHERE uniqueid="${args[0]}"`, async (err, row) => {
            if(err) return console.log(err);
            if(!row[0]) {
                message.channel.send(`I was unable to find that case.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                    message.delete()
                }).catch(e => {if(config.main_config.debugmode) return console.log(e);});
            } else {
                var t;
                t = await client.users.fetch(row[0].enforcerid);
                var v;
                v = await client.users.fetch(row[0].userid);
                        const thecase = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`Case Information:`)
                        .setDescription(`**Number:** ${row[0].uniqueid}\n**Enforcer:** ${t.tag} - (${row[0].enforcerid})\n**User:** ${v.tag} - (${row[0].userid})\n**Type:** ${row[0].type}\n**Reason:** ${row[0].reason}`)
                        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${config.main_config.copyright}`)
                        message.channel.send(thecase).then(msg => {msg.delete({timeout: 14000})}).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }

        });

    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

    }
}

