module.exports = {
    name: 'list',
    description: 'Creates a new listing.',
    aliases: ['addlisting', 'newlisting'],
    async execute(client, message, args, Hyperz, config, con){

try {

    if(message.guild.id === config["main_config"].yourserverid) {

        const per = config["permissions_config"].assistantmanagers
        if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(config["assistant_config"].enabled) {

                if(config["assistant_config"].useListingCommand) {


                    message.channel.send(`Building your listing...`).then(msg => (msg.delete({ timeout: 1200 }))).catch(e => {if(config["main_config"].debugmode) return console.log(e);})


            let reason = args.join(" ")
        
            var image;
        
                    try {
                        image = reason.split("[")[1].replace("]", "");
                    } catch(e) {
                        image = `${config["assistant_config"].noListingImageFound}`
                    }

            let refinedReason = reason.split("[")[0]

    setTimeout(function(){

        const buildEmbed = new Hyperz.MessageEmbed()
        .setImage(image)
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
        .setTitle(`New Listing:`)
        .setDescription(refinedReason)
        .setTimestamp()
        .setFooter(`${config["main_config"].copyright}`)
    
        message.channel.send(buildEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

    }, 1200)

            } else {
                message.channel.send("This command is disabled, please ask the owner to enable it.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
            }

        } else {
            message.channel.send(`This module is disabled, please ask the owner to enable it.`).then(msg => {msg.delete({ timeout: 12000 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
        }

    } else {
        message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
    }

} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(err => {if(config["main_config"].debugmode) return console.log(err);});
}



        
} catch(e) {
            if(config["main_config"].debugmode) return console.log(e);
        }
    },
}