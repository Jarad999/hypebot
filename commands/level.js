module.exports = {
    name: 'level',
    description: 'Check your level.',
    aliases: ['xp', 'rank', 'lvl'],
    async execute(client, message, args, Hyperz, config, con){

    try {

            if(message.guild.id != config["main_config"].yourserverid) return message.channel.send(`This command must be ran in the main guild...`).then(msg => {
                msg.delete({ timeout: 9000 })
                message.delete()
            }).catch(e => {});

            if(!config.leveling_config.enabled) return message.channel.send(`This module is currently disabled...`).then(msg => {
                msg.delete({ timeout: 9000 })
                message.delete()
            }).catch(e => {});

            var pingeduser;
            if(message.mentions.users.first()) {
                pingeduser = message.mentions.users.first()
            } else {
                pingeduser = message.author
            }

            if(!pingeduser) return;

            con.query(`SELECT * FROM chatlvl WHERE userid='${pingeduser.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    const embed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`Users Current Level:`)
                    .setThumbnail(`${pingeduser.displayAvatarURL({dynamic: true})}`)
                    .setDescription(`**Current XP:** ${row[0].userxp}\n**Current Level:** ${row[0].userlvl}`)
                    .setFooter(`${config["main_config"].copyright} | Requested By ${message.author.tag}`)

                    message.channel.send(embed).then(msg => msg.delete({ timeout: 22000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                } else {
                    message.channel.send(`I was unable to find that user...`).then(msg => msg.delete({ timeout: 22000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                }
            });

        } catch(e) {
            if(config.main_config.debugmode) return console.log(e)
        }
    }
}

