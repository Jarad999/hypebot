module.exports = {
    name: 'lb',
    description: 'Check the leaderboard.',
    aliases: ['ranks', 'leaderboard'],
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

            let index = 0;
            let poop = [];
            let top15users = "";

            await con.query(`SELECT * FROM chatlvl ORDER BY userxp DESC LIMIT 15`, async (err, row) => {
                row.forEach(u => {
                    let t = message.guild.members.cache.find(p => p.id == u.userid);
                    if(t) {
                        poop.push({chatInfo: u, username: t.user.tag});
                    } else {
                        poop.push({chatInfo: u, username: "Unknown User (Left)"});
                    }
                });

                poop.forEach(Y => {
                    index++;
                    if(index < 10) index = `0${index}`;
                    if (index == 1) {
                        top15users += `\`${index}.\` :first_place: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    } else if (index == 2) {
                        top15users+= `\`${index}.\` :second_place: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    } else if (index == 3) {
                        top15users+= `\`${index}.\` :third_place: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    } else if ( index <= 15 ) {
                        top15users+= `\`${index}.\` :checkered_flag: **Lvl:** ${Y.chatInfo.userlvl} **XP:** ${Y.chatInfo.userxp} - ${Y.username}\n`
                    }
                });

                const embed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`__${message.guild.name}__ Chat Leaderboard`)
                    .setThumbnail(message.guild.iconURL({dynamic: true}))
                    .setDescription(top15users)
                    .setFooter(`${config["main_config"].copyright} | Requested By ${message.author.tag}`)
                
                    message.channel.send(embed).then(msg => msg.delete({timeout: 45000})).catch(e => {})
                    message.delete().catch(e => {})

            });

        } catch(e) {
            if(config.main_config.debugmode) return console.log(e)
        }
    }
}

