module.exports = {
    name: 'punishments',
    description: 'Check a users cases.',
    aliases: ['punishment'],
    async execute(client, message, args, Hyperz, config, con){

    try {

        if(!args[0]) return message.channel.send(`Please include a user ID to check...`).then(msg => {
            msg.delete({timeout: 10000})
            message.delete()
        }).catch(e => {});

        var foundmember;
        
        if(message.mentions.users.first()) {
            message.channel.send(`Please use a User ID. Not a mention.`).then(msg => {
                msg.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => {});
            return;
        } else if(args[0]) {
            foundmember = await client.users.fetch(args[0])
            if(!foundmember) {
                message.channel.send(`That is not a valid user ID.`).then(msg => {
                    msg.delete({ timeout: 12000 })
                    message.delete()
                }).catch(e => {});
    
                return;
            }
        }

        await con.query(`SELECT * FROM cases WHERE userid="${foundmember.id}"`, async (err, rows) => {
            if(err) return console.log(err);
            if(!rows[0]) {
                message.channel.send(`This user has no punishments.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                    message.delete()
                }).catch(e => {if(config.main_config.debugmode) return console.log(e);});
            } else {
                var t;
                var v;
                v = await client.users.fetch(rows[0].userid);

                        const thecase = new Hyperz.MessageEmbed()
                        .setColor(config["main_config"].colorhex)
                        .setTitle(`${v.tag}'s Punishments:`)
                        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${config.main_config.copyright}`)

                        var fortnite = [];

                        for (let data of rows) {
                            t = await client.users.fetch(data.enforcerid);
                            await fortnite.push(`**Case #${data.uniqueid}**\n\`Enforcer:\` ${t.tag}\n\`Type:\` ${data.type}\n\`Reason:\` ${data.reason}\n --------`)
                        }

                        await thecase.setDescription(`${fortnite.join("--------\n")}`)

                        message.channel.send(thecase).then(msg => {msg.delete({timeout: 14000})}).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }

        });

    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

    }
}

