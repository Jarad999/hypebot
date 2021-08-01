
module.exports = {
  name: 'unban',
  description: 'Unbans a user.',
  aliases: ['unbanish', 'pardon'],
  async execute(client, message, args, Hyperz, config, con){

    const member = message.member

    if (member.hasPermission('BAN_MEMBERS')) {
          const g = message.guild
          const memberbanned = args.join(" ")

          if(args[1]) {
            message.channel.send(`I couldn't find a user with the ID: \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
          } else {

            if(!client.users.fetch(memberbanned)) {
              message.channel.send(`I couldn't find a user with the ID: \`${args.join(" ")}\``).then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
              message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            } else {

          try {
            g.fetchBans().then(bs => {
              bs.forEach(b => {
                if(b.user.id == memberbanned) {
                  g.members.unban(`${memberbanned}`).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                }
              });
            });
          } catch(e) {
            if(config["main_config"].debugmode) return console.log(e);
          }

          con.query(`SELECT * FROM offlinebans WHERE id='${memberbanned}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
              await con.query(`DELETE FROM offlinebans WHERE id='${memberbanned}'`, async (err, row) => {
                if(err) throw err;
              });
            }
          });

          await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
            let uniqueid = row[0].total + 1
            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${memberbanned}', 'User Un-banned', '${uniqueid}', '${message.author.id}', 'Un-Ban')`, async (err, row) => {});
          });

          if(config["logging_config"].enable_punishment_logging) {

            config["logging_config"].punishment_logging_channels.forEach(async chan => {
        
                const thechannel = client.channels.cache.get(chan)
                if(!thechannel) {
                    console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                } else {
                    const logembed = new Hyperz.MessageEmbed()
                    .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                        .setAuthor(`Action Logs - User Un-Banned`, client.user.displayAvatarURL())
                        .addFields(
                            {name: `User ID:`, value: `${memberbanned}`},
                            {name: `Enforcer:`, value: `${message.author.tag}`},
                        )
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                    thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                }
            
            }); 
    
        }

          const embed = new Hyperz.MessageEmbed()
          .setColor(config["main_config"].colorhex)
          .setTitle("User Un-Banned")
          .setDescription("I have un-banned that user.")
          .setTimestamp()
          .setFooter(`${config["main_config"].copyright}`)
          message.channel.send(embed).then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
          message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }
        }
      }
  },
}