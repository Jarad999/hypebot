module.exports = {
    name: 'version',
    description: 'A command.',
    aliases: ['v', 'currentversion', 'currentv'],
    async execute(client, message, args, Hyperz, config, con){
    const versionEmbed = new Hyperz.MessageEmbed()
    .setColor(config["main_config"].colorhex)
    .setTitle(`Bot Version`)
    .setURL(`${config["other_configuration"].serverinvite}`)
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, 'https://hyperz.dev/')
    .setDescription(`This Bots **Active Version is:** __3.5__\n \nCoded on [Plat-2](https://docs.hyperz.dev/knowledgebase/hypedjs-plat2)`)
    .setThumbnail('https://hyperz.dev/images/logo.png')
    .setTimestamp()
    .setFooter(`Bot Created By Hyperz#0001`)
    
    message.channel.send(versionEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
}

// Credits:
// Physical Programming: Hyperz#0001