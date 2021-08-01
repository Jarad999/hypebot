module.exports = {
    name: 'stickyremove',
    description: 'Removes a sticky message in a channel.',
    aliases: ['removesticky', 'rsticky', 'delsticky', 'deletesticky'],
    async execute(client, message, args, Hyperz, config, con){

        try {

            if(message.guild.id != config["main_config"].yourserverid) return message.channel.send(`This command must be ran in the main guild...`).then(msg => {
                msg.delete({ timeout: 9000 })
                message.delete()
            }).catch(e => {});

            const per = config["permissions_config"].stickymsgperms
            if(message.member.roles.cache.some(h=>per.includes(h.id))){

            if(!message.channel) return message.channel.send(`Please run this command in a channel...`).then(msg => {
                msg.delete({ timeout: 9000 })
            }).catch(e => {});

            con.query(`SELECT * FROM stickymsgs WHERE channelid = '${message.channel.id}'`, async (err, row) => {
                if(err) throw err;
                if(!row[0]) {
                    message.channel.send(`There is not a sticky message in this channel...`).then(msg => {
                        msg.delete({ timeout: 9000 })
                        message.delete()
                    }).catch(e => {});
                } else {
                    await con.query(`DELETE FROM stickymsgs WHERE channelid = '${message.channel.id}'`, async (err, row) => {
                        if(err) throw err;
                        await con.query(`SELECT * FROM stickymsgs WHERE channelid = '${message.channel.id}'`, async (err, row) => {
                            if(err) throw err;
                            if(!row[0]) {
                                await message.channel.send(`Sticky message was deleted!`).then(msg => {
                                    msg.delete({ timeout: 9000 })
                                    message.delete()
                                }).catch(e => {});
                            } else {
                                await message.channel.send(`Something went wrong, please try again...`).then(msg => {
                                    msg.delete({ timeout: 9000 })
                                    message.delete()
                                }).catch(e => {});
                            }
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