module.exports = {
    name: 'infoserver',
    description: 'A command.',
    aliases: ['serverinfo', 'server'],
    async execute(client, message, args, Hyperz, config, con){

    if(!message.guild) return;

    const daGuild = message.guild

    const serverEmbed = new Hyperz.MessageEmbed()
    .setColor(config["main_config"].colorhex)
    .setTitle(`Server Info: ${daGuild.name}`)
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
    .setThumbnail(daGuild.iconURL({dynamic: true}))
    .addFields(
        { name: 'Name:', value: `${daGuild.name}`, inline: true},
        { name: 'ID:', value: `${daGuild.id}\n`, inline: true},
        { name: 'Owner:', value: `<@${daGuild.ownerID}>\n`, inline: true},
        { name: 'Members:', value: `${daGuild.members.cache.size}`, inline: true},
        { name: 'Users:', value: `${daGuild.members.cache.filter(member => !member.user.bot).size}`, inline: true},
        { name: 'Bots:', value: `${daGuild.members.cache.filter(member => member.user.bot).size}`, inline: true},
        { name: 'Date of Creation:', value: `\`\`\`${daGuild.createdAt.toLocaleString()}\`\`\``},
    )
    .setTimestamp()
    .setFooter(`${config["main_config"].copyright}`)
    
    message.channel.send(serverEmbed).then(msg => msg.delete({ timeout: 30000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
}

// Credits:
// Physical Programming: Hyperz#0001