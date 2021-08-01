module.exports = {
    name: 'invite',
    description: 'A command.',
    aliases: ['buythisbot', 'hyperz'],
    async execute(client, message, args, Hyperz, config, con){
        message.channel.send(`${config["other_configuration"].serverinvite}`).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    }
}

