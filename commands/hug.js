module.exports = {
    name: 'hug',
    description: 'Give somebody a hug.',
    aliases: ['hugs', 'bearhug'],
    async execute(client, message, args, Hyperz, config, con){

    const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!pingeduser) return message.channel.send(`I couldn't find that user...`).then(msg => {
        msg.delete({timeout: 9000}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        try {
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            } catch(e) {
                if(config["main_config"].debugmode) return console.log(e);
            }
    }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

            message.channel.send(`<@${message.author.id}> has just hugged <@${pingeduser.id || pingeduser}>`).then(msg => msg.delete({ timeout: 22000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            
    }
}