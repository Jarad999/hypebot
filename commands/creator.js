// Please dont change this :]
// Please dont change this :]
// Please dont change this :]
module.exports = {
    name: 'creator',
    description: 'A command.',
    aliases: ['credits', 'hyperz'],
    async execute(client, message, args, Hyperz, config, con){

        const creatorEmbed = new Hyperz.MessageEmbed()
        .setTitle(`Bot Credits`)
        .setColor(`${config["main_config"].colorhex}`)
        .setURL('https://hyperz.dev/')
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, 'https://hyperz.dev/')
        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
        .addFields(
            {name: `Programming:`, value: "`Hyperz#0001` - Head Developer of the HypeBot Project.\n `JipyTheDev#3478` - Added Music & Helps with Support."},
            {name: `Assistance:`, value: "`KingEZFLOW#5661` - Helped W/Questions & Bug Testing.\n`PlutoTheDev#1000` - Assisted in Ticket Module.\n`NAT2K15#2951` - Assisted in Ticket Module.\n`FAXES#8655` - Inspiration for the bot."},
        )
        .setTimestamp()
        .setFooter(`Bot Created By Hyperz#0001`)
    
    message.channel.send(creatorEmbed).then(msg => msg.delete({ timeout: 15000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
    }
}
// Please dont change this :]
// Please dont change this :]
// Please dont change this :]