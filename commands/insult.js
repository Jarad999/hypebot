module.exports = {
    name: 'insult',
    description: 'Insult command.',
    aliases: ['murder', 'annialate', 'destroy'],
    async execute(client, message, args, Hyperz, config, con){

        if(config["filter_config"].enabled) {

        if(config["filter_config"].useInsults) {

    try {

        const pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        if(!pingeduser) return message.channel.send(`You need to include a user to insult...`).then(msg => {
            msg.delete({timeout: 9000}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            try {
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                } catch(e) {
                    if(config["main_config"].debugmode) return console.log(e);
                }
        }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

        const yikeslol = config["filter_config"].insultSubRedditName
        const https = require('https');
        const url = `https://www.reddit.com/r/${yikeslol}/hot/.json?limit=100`

        if(!yikeslol) return console.log(`term: insultSubRedditName in: config.json is: empty`);

        message.channel.send(`Stfu, I'm gonna take my damn time...`).then(msg => {msg.delete({ timeout: 2600 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data
                var title = index.title

                message.channel.send(`${pingeduser.user.username}, ${title}`).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            }).on('error', function (e) {
                if(config["main_config"].debugmode) return console.log(e);
            })
        })

    } catch(e) {
        if(config["main_config"].debugmode) return console.log(e);
    }

} else {
    message.channel.send("This command is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}

} else {
    message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}

    },
}