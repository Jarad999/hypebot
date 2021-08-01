module.exports = {
    name: 'meme',
    description: 'Meme command lol.',
    aliases: ['shitpost', 'getmeme', 'plsmeme'],
    async execute(client, message, args, Hyperz, config, con){

        if(config["filter_config"].enabled) {

        if(config["filter_config"].useMemes) {

    try {

        const yikeslol = config["filter_config"].memeSubRedditName
        const https = require('https');
        const url = `https://www.reddit.com/r/${yikeslol}/hot/.json?limit=100`

        if(!yikeslol) return console.log(`term: memeSubRedditName in: config.json is: empty`);

        message.channel.send(`Grabbing ya a meme.`).then(msg => {msg.delete({ timeout: 3500 })}).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    const textembed = new Hyperz.MessageEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send(textembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')

                if (index.post_hint !== 'image') {
                    const textembed = new Hyperz.RichEmbed()
                        .setColor(`${config["main_config"].colorhex}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)

                    message.channel.send(textembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }
                const imageembed = new Hyperz.MessageEmbed()
                    .setImage(image)
                    .setColor(`${config["main_config"].colorhex}`)
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                    .setTimestamp()
                    .setFooter(`${config["main_config"].copyright}`)
                message.channel.send(imageembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
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