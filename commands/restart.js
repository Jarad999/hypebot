module.exports = {
    name: 'restart',
    description: 'Reboot the Discord bot.',
    aliases: ['reboot'],
    async execute(client, message, args, Hyperz, config, con){

    try {

        if(message.author.id == config.main_config.botownerid) {

            const token = client.token;
            message.channel.send(`Restarting...`);

            client.destroy()
            client.login(token);
            
            setTimeout(function() {
                message.channel.send(`I've restarted.`);
                message.delete().catch(e => {})
            }, 6000)

        } else {
            message.channel.send(`Only the bot owner may use this command...`).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }

    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

    }
}

