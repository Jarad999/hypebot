module.exports = {
    name: 'infouser',
    description: 'A command.',
    aliases: ['whois', 'about', 'user'],
    async execute(client, message, args, Hyperz, config, con){

    const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!pingeduser) return message.channel.send(`Please enter a user to check...`).then(msg => {
        msg.delete({timeout: 9000}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    });

        await con.query(`SELECT * FROM users WHERE userid='${pingeduser.user.id}'`, async (err, row) => {
            if(err) throw err;
            
            const userEmbed = new Hyperz.MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setTitle(`User Info: ${pingeduser.user.tag}`)
            .setURL(config["other_configuration"].serverinvite)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
            .setThumbnail(pingeduser.user.displayAvatarURL({dynamic: true}))
            .addFields(
                { name: 'Tag:', value: `${pingeduser.user.tag}`, inline: true},
                { name: 'ID:', value: `${pingeduser.user.id}\n`, inline: true},
                { name: 'Bot:', value: `${pingeduser.user.bot}`, inline: true},
                { name: 'Status:', value: `${pingeduser.user.presence.status}`, inline: true},
                { name: 'Nickname:', value: `${pingeduser.displayName}`, inline: true},
                { name: 'Highest Role:', value: `${pingeduser.roles.highest}`, inline: true},
                { name: 'Joined Server:', value: `\`\`\`${pingeduser.joinedAt.toLocaleString()}\`\`\``},
                { name: 'Joined Discord:', value: `\`\`\`${pingeduser.user.createdAt.toLocaleString()}\`\`\``},
                { name: 'Warns:', value: `${row[0].warns}`, inline: true},
                { name: 'Mutes:', value: `${row[0].mutes}`, inline: true},
                { name: 'Kicks:', value: `${row[0].kicks}`, inline: true},
                { name: 'Bans:', value: `${row[0].bans}`, inline: true},
                { name: 'Requesting User:', value: `${message.author.tag}`, inline: true},
            )
            .setTimestamp()
            .setFooter(`${config["main_config"].copyright}`)
            
            message.channel.send(userEmbed).then(msg => msg.delete({ timeout: 30000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

        });
    }
}

// Credits:
// Physical Programming: Hyperz#0001