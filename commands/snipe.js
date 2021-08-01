module.exports = {
    name: 'snipe',
    description: 'Gets the last deleted message.',
    aliases: ['getlast', 'undelmessage', 'undelmsg', 'snpe', 'sipe'],
    async execute(client, message, args, Hyperz, config, con){

    try {
    
        const msg = client.snipes.get(message.channel.id)
        
        const snipeEmbed = new Hyperz.MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setAuthor(msg.author, msg.member.user.displayAvatarURL({dynamic: true}))
            .setTitle(`Sniped The Message!`)
            .setDescription(`\`\`\`${msg.content}\`\`\``)
            .setTimestamp()
            .setFooter(`${config["main_config"].copyright}`)

        if(config["other_configuration"].deleteSnipes) {
            message.channel.send(snipeEmbed).then(msg => {msg.delete({ timeout: 60000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        } else {
            message.channel.send(snipeEmbed)
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
    } catch(e) {
        console.log(`I was unable to fetch a sniped message.\nERROR: ${e}`)
    }
    },
}