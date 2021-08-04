const fs = require('fs');
const ms = require('ms');
const chalk = require('chalk');
const axios = require('axios');
const invites = {};
const wait = require('util').promisify(setTimeout);
const nodelogger = require('hyperz-nodelogger')
const logger = new nodelogger()
const { loader } = require('../../util/loader.js');
let i = 0;
module.exports = async(client, Hyperz, config, con) => {

    try {

        loader(client, Hyperz, config, con)

        try {

            setInterval(function () {
                con.ping()
            }, ms(`25m`));

            process.on('unhandledRejection', err => {});

            client.guilds.cache.forEach(async g => {
                if(g.id != config.main_config.yourserverid) {
                    await g.leave().catch(e => {})
                }
            });

        client.users.cache.forEach(u => {
            if(u.bot) {

            } else {
                con.query(`SELECT * FROM users WHERE userid='${u.id}'`, async (err, row) => {
					if(err) throw err;
                    if(!row[0]) {
                        await con.query(`INSERT INTO users (userid, warns, kicks, bans, mutes) VALUES ('${u.id}', '0', '0', '0', '0')`, async (err, row) => {});
                    }
                });
            }
        });

        } catch(e) {
            console.log(e)
        }

        let daPort = config["main_config"].port

        const express = require("express");
        const app = express()
        app.listen(daPort)

        if (config["logging_config"].enable_invite_logging) {

            await wait(1000);

            const thatguildlol = client.guilds.cache.get(`${config["main_config"].yourserverid}`)

            thatguildlol.fetchInvites().then(guildInvites => {
                invites[thatguildlol.id] = guildInvites;
            });



            client.on('guildMemberAdd', guildMember => {

                if (guildMember.guild.id === `${config["main_config"].yourserverid}`) {

                    let member = guildMember

                    member.guild.fetchInvites().then(guildInvites => {

                        const ei = invites[member.guild.id];

                        invites[member.guild.id] = guildInvites;

                        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

                        const inviter = client.users.cache.get(invite.inviter.id);

                        var ballslol;

                        if(config.new_user_config.useVerificationSystem) {

                            ballslol = new Hyperz.MessageEmbed()
                            .setColor(`${config.logging_config.invite_logs_color || config.main_config.colorhex}`)
                            .setTitle(`Invite Logging Info:`)
                            .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                            .addFields({ name: `New Member:`, value: `${member.user.tag}`, inline: true }, { name: `Invited By:`, value: `${inviter}`, inline: true }, { name: `Invite Code:`, value: `${invite.code}`, inline: true }, { name: `Invite Uses:`, value: `${invite.uses}`, inline: true }, { name: 'Highest Role:', value: `${member.roles.highest}`, inline: true }, { name: `Joined Discord:`, value: `${member.user.createdAt.toLocaleString()}`, inline: true }, )
                            .setTimestamp()
                            .setFooter(`${config["main_config"].copyright}`)

                        } else {

                            ballslol = new Hyperz.MessageEmbed()
                            .setColor(`${config.logging_config.invite_logs_color || config.main_config.colorhex}`)
                            .setTitle(`Invite Logging Info:`)
                            .setThumbnail(`${guildMember.user.displayAvatarURL({dynamic: true})}`)
                            .addFields({ name: `New Member:`, value: `${member.user.tag}`, inline: true }, { name: `Invited By:`, value: `${inviter}`, inline: true }, { name: `Invite Code:`, value: `${invite.code}`, inline: true }, { name: `Invite Uses:`, value: `${invite.uses}`, inline: true }, { name: 'Highest Role:', value: `<@&${member.roles.highest}>`, inline: true }, { name: `Joined Discord:`, value: `${member.user.createdAt.toLocaleString()}`, inline: true }, )
                            .setTimestamp()
                            .setFooter(`${config["main_config"].copyright}`)

                        }
                        config["logging_config"].invite_logging_channels.forEach(chan => {

                            const thechannel = client.channels.cache.get(chan)
                            if (!thechannel) {
                                console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                            } else {
                                thechannel.send(ballslol).catch(e => { if (config["main_config"].debugmode) return console.log(e); })
                            }

                        });

                    });

                }

            });

        }

	let content = `\nLogged in as ${client.user.tag} (${chalk.green(client.user.id)})\nOnline for ${chalk.green(client.guilds.cache.size)} guilds and ${chalk.green(client.users.cache.size)} users.\n\nPrefix: ${chalk.blue(config["main_config"].prefix)} (Default)\nCommands: 85\nEvents: 12\nCreated By: ${chalk.blue(`Hyperz#0001`)}\n\nDebug Mode: ${chalk.yellow(config["main_config"].debugmode)}\n\n Support available at ${chalk.blue(`https://support.hyperz.dev`)}`;
	logger.hypelogger(`HypeBot`, '500', 'blue', content, 'disabled', 'blue', 'single', true)
        
        changeStatus(client, config)

        if(config.reactionroles.enabled) {
            config.reactionroles.reactions.forEach(async r => {
              try {
                  await client.channels.cache.forEach(async c => {
                    let msg = await c.messages.fetch(`${r.messageid}`)
                    if(msg == undefined) {
                        setTimeout(() => {
                            console.log(`A message ID in your reaction roles config does not exist.`)
                        }, 6200);
                    }
                    try {
                        await msg.react(`${r.reactionname}`)
                    } catch(e) {
                        if (config["main_config"].debugmode) return console.log(e);
                    }
                  });
              } catch(e) {
                if (config["main_config"].debugmode) return console.log(e);
              }
            });
          }

        if (config["serverstats_config"].enabled) {


            const membercountc = config["serverstats_config"].membercountchannelid
            const usercountc = config["serverstats_config"].usercountchannelid
            const botcountc = config["serverstats_config"].botcountchannelid

            // Member Count Code
            if (config["serverstats_config"].useMemberCount) {
                const updateMembers = (guild) => {
                    const channel = guild.channels.cache.get(membercountc)
                    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
                }

                client.on('guildMemberAdd', (member) => updateMembers(member.guild))
                client.on('guildMemberRemove', (member) => updateMembers(member.guild))

                const guild = client.guilds.cache.get(config["main_config"].yourserverid)
                updateMembers(guild);

                if (typeof aliases === 'string') {
                    aliases = [aliases]
                }
            }

            // User Count Code
            if (config["serverstats_config"].useUserCount) {
                const updateUsers = (guild) => {

                    const channel = guild.channels.cache.get(usercountc)
                    channel.setName(`Users: ${guild.members.cache.filter(member => !member.user.bot).size}`)
                }

                client.on('guildMemberAdd', (member) => updateUsers(member.guild))
                client.on('guildMemberRemove', (member) => updateUsers(member.guild))

                const guild = client.guilds.cache.get(config["main_config"].yourserverid)
                updateUsers(guild);

                if (typeof aliases === 'string') {
                    aliases = [aliases]
                }
            }

            // Bot Count Code
            if (config["serverstats_config"].useBotCount) {
                const updateBots = (guild) => {

                    const channel = guild.channels.cache.get(botcountc)
                    channel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`)
                }

                client.on('guildMemberAdd', (member) => updateBots(member.guild))
                client.on('guildMemberRemove', (member) => updateBots(member.guild))

                const guild = client.guilds.cache.get(config["main_config"].yourserverid)
                updateBots(guild);

                if (typeof aliases === 'string') {
                    aliases = [aliases]
                }
            }

        }

        if (config.fiveminteg.enabled) {
            try {
                config.fiveminteg.servers.forEach(async e => {

                    setInterval(async function() {
                        let channel = await client.channels.cache.get(e.channelid);

                        let check = await axios({
                            method: 'get',
                            url: `http://${e.serverIPPort}/dynamic.json`,
                        }).catch(e => console.log(e));

                        if(check) {
                            if(check.data) {
                                channel.setName(`${e.name}: ${check.data.clients}/${check.data.sv_maxclients}`);
                            } else {
                                channel.setName(`${e.name}: 0`);
                            }
                        } else {
                            channel.setName(`${e.name}: 0`);
                        }
                    }, ms(`${config.fiveminteg.refreshrate}`))

                });
            } catch(e) {
                if (config["main_config"].debugmode) return console.log(e);
            }
        }

    } catch (e) {
        if (config["main_config"].debugmode) return console.log(e);
    }
}

async function changeStatus(client, config) {
    if (i >= config.presence_config.length) i = 0;
    await client.user.setPresence({
        activity: {
            name: config.presence_config[i].name,
            type: config.presence_config[i].type
        },
        status: config.presence_config[i].status
    });
    i++;
    setTimeout(() => {
        changeStatus(client, config);
    }, 10000)

};
