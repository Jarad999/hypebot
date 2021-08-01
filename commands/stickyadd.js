module.exports = {
    name: 'stickyadd',
    description: 'Adds a sticky message to a channel.',
    aliases: ['addsticky'],
    async execute(client, message, args, Hyperz, config, con){

        try {

            if(message.guild.id != config["main_config"].yourserverid) return message.channel.send(`This command must be ran in the main guild...`).then(msg => {
                msg.delete({ timeout: 9000 })
                message.delete()
            }).catch(e => {});

            const per = config["permissions_config"].stickymsgperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(!args[0]) return message.channel.send(`Please include a message with your sticky entry...`).then(msg => {
                msg.delete({ timeout: 9000 })
                message.delete()
            }).catch(e => {});

            if(!message.channel) return message.channel.send(`Please run this command in a channel...`).then(msg => {
                msg.delete({ timeout: 9000 })
            }).catch(e => {});

            con.query(`SELECT * FROM stickymsgs WHERE channelid = '${message.channel.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    message.channel.send(`There is already a sticky message in this channel...`).then(msg => {
                        msg.delete({ timeout: 9000 })
                        message.delete()
                    }).catch(e => {});
                } else {
                    let msg = args.join(" ").replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                    await con.query(`INSERT INTO stickymsgs (channelid, enforcerid, msg) VALUES ('${message.channel.id}', '${message.author.id}', "${msg}")`, async (err, row) => {
                        if(err) throw err;
                        await con.query(`SELECT * FROM stickymsgs WHERE channelid = '${message.channel.id}' AND enforcerid = '${message.author.id}'`, async (err, row) => {
                            if(err) throw err;
                            await message.channel.send(`${row[0].msg}`)
                        });
                    });
                }
            });

        } else {
            message.channel.send(`You don't have permission to run this command.`).then(msg => {
                msg.delete({ timeout: 9000 })
                message.delete()
            }).catch(e => {});
        }
    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }
    },
}

