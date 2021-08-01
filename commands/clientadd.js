module.exports = {
    name: 'clientadd',
    description: 'Adds a user to the client role.',
    aliases: ['addclient', 'newclient'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {

            const per = config["permissions_config"].assistantmanagers
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(config["assistant_config"].enabled) {

        const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        const deRole = config["assistant_config"].client_role_id

        if(pingeduser) {

                try {

                    pingeduser.roles.add(deRole)

                    const roleEmbed = new Hyperz.MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`Client Role Added!`)
                    .setDescription(`I have **given ${pingeduser.user.tag}** the client role.`)
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                
                    message.channel.send(roleEmbed).then(msg => {msg.delete({ timeout: 14000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
                } catch(e) {
                    if(config["main_config"].debugmode) return console.log(e);
                }
    } else {
        message.channel.send(`I was unable to find that user.`).then(msg => {msg.delete({ timeout: 12000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
    }
}
    } else {
        message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
    }
        } else {
            message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
        }
    },
}