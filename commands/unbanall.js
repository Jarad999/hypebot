module.exports = {
    name: 'unbanall',
    description: 'Unban all users in the current server.',
    aliases: ['massunban', 'allunban'],
    async execute(client, message, args, Hyperz, config, con){

        try {
            if(message.author.id == message.guild.owner.user.id) {
                const someembedlol = new Hyperz.MessageEmbed()
                .setColor(config["main_config"].colorhex)
                .setTitle(`Remove Bans`)
                .setDescription(`Please confirm that you wish to revoke all current server bans in this guild.\n\n**Note:** This process may take awhile, and cannot be easily stopped or un-done.\n\n**Do you still wish to continue?**\n✅ - Yes, remove all bans.\n❌ - No, cancel command.`)
                .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                .setTimestamp()
                .setFooter(`${config["main_config"].copyright}`)

                message.channel.send(someembedlol).then(balls => {
                    balls.react('✅').then(() => balls.react('❌'));
                    const johncena = (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user.bot == false;
                    };
                    balls.awaitReactions(johncena, { max: 1, time: ms("25m")}).then(collected => {
                        const react23847= collected.first();
                        if(react23847.emoji.name === '✅') {
                            message.channel.send(`Please Wait! We are beginning the process now...`).then(msg => {
                                msg.delete({ timeout: 10000 })
                                balls.delete()
                                message.delete()
                            }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                            setTimeout(() => {
                                
                                message.guild.fetchBans().then(bans => {
                                    if (bans.size == 0) {message.reply("There are no banned users."); throw "No members to unban."};
                                    bans.forEach(ban => {
                                        message.guild.members.unban(ban.user.id);                     
                                    })
                                }).then(() => console.log("Users are being unbanned.")).catch(e => console.log(e))

                            }, 6000);
                        }
                        if(react23847.emoji.name === '❌') {
                            return message.channel.send(`Cancelling update bans process...`).then(msg => {
                                msg.delete({ timeout: 10000 })
                                balls.delete()
                                message.delete()
                            }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                        }
                    })
                }).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            } else {
                message.channel.send(`Only the guild owner may use this command...`).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            }
        } catch (e) {
            console.log(e)
        }

    },
}