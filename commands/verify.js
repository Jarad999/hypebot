module.exports = {
    name: 'verify',
    description: 'Verifies a user.',
    aliases: ['Verify', 'verifyme'],
    async execute(client, message, args, Hyperz, config, con){
        
        if(message.guild.id === config["main_config"].yourserverid) {

            if(config["new_user_config"].enabled) {

            if(config["new_user_config"].useVerificationSystem) {

    try {

            const per = config["new_user_config"].verifiedroleids
            if(message.member.roles.cache.some(h=>per.includes(h.id))) {
                message.channel.send(`You're already verified!`).then(msg => {msg.delete({ timeout: 14000 })}).catch(e => {console.log(e)})
                try {
                    message.delete().catch(err => console.log(err));
                } catch(e) {
                    console.log(e)
                }
            } else {
                const target = message.member

            if(target) {
                try {
                    config["new_user_config"].verifiedroleids.forEach(deVerifiedRole => {
                        target.roles.add(deVerifiedRole);
                    });
                } catch(e) {
                    console.log(e)
                }

            setTimeout(function(){

                if(message.member.roles.cache.some(h=>per.includes(h.id))) {
                    try {
                        const deEmbed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setTitle(`You've Been Verified!`)
                        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                        .setDescription(`I have __successfully__ verified your roles in ${config["main_config"].yourservername}!\nEnjoy your stay, and follow the rules!`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                        target.send(deEmbed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                    } catch(e) {
                        console.log(e).then(console.log(`Errors May Persist if the user's DM's are set to: 'PRIVATE'!`))
                    }
                } else {
                    console.log(`${message.member.tag} was not verified...`)
                }

            }, 3000);

        }

        
            }


    } catch(e) {
        if(config["main_config"].debugmode) return console.log(e);
    }


        } else {
            console.log(`${message.member.tag} tried to run the verify command, but 'Use Verification System' is set to false.`)
        }
        
    } else {
        // Just gonna leave this blank lmaooooooo
        console.log(`Verify command was entered, but 'new_user_config' is disabled.`)
    }

        } else {
            message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 12000 })).catch(e => {console.log(e)})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        }

    },
}