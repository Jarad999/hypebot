module.exports = {
    name: 'wink',
    description: 'Give somebody a hug.',
    aliases: ['winks', 'dowink'],
    async execute(client, message, args, Hyperz, config, con){

        const gifs = [
            "https://tenor.com/view/mr-bean-wink-wink-winking-rowan-atkinson-gif-15388297",
            "https://tenor.com/view/friends-joey-tribbiani-matt-le-blanc-wink-gif-15694137",
            "https://tenor.com/view/the-office-michael-scott-steve-carell-wink-gif-7720100",
            "https://tenor.com/view/wink-flirty-james-franco-gif-9644828",
            "https://tenor.com/view/wink-emoji-gif-10802837",
            "https://tenor.com/view/sexy-wink-rdj-robert-downey-jr-gif-15956626",
            "https://tenor.com/view/wink-katy-perry-flirty-gif-5060235",
            "https://tenor.com/view/jake-gyllenhaal-wink-smile-sexy-okay-gif-15428665",
            "https://tenor.com/view/donald-trump-wink-president-usa-gif-7576941",
            "https://tenor.com/view/dog-doge-dogo-blink-wink-gif-11385524",
            "https://tenor.com/view/flirt-wink-eyebrows-milhouse-the-simpsons-gif-5751664",
            "https://tenor.com/view/dean-supernatural-wink-jensen-ackles-point-gif-5104974"
        ]

        let gifmaths = gifs[Math.floor(gifs.length * Math.random())];

            message.channel.send(gifmaths).then(msg => msg.delete({ timeout: 60000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            
    }
}