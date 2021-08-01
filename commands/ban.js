
module.exports = {
  name: 'ban',
  description: 'Sends an avatar.',
  aliases: ['banish'],
  async execute(client, message, args, Hyperz, config, con){

    const member = message.member
    const guild = message.guild

    if (member.hasPermission('BAN_MEMBERS')) {

      var founduser; 
        if (message.mentions.users.first()) {
            founduser = await client.users.fetch(message.mentions.users.first().id);
          } else if (!isNaN(args[0])) {
            founduser = await client.users.fetch(args[0]);
          } else {
            return message.channel.send("Please provide a user for me to ban, it can be a mention or id.").then(msg => {
                 msg.delete({ timeout: 12000 })
                 message.delete()
            }).catch(e => { if (config.main_config.debugmode) return console.log(e);});
          };

          if (founduser == undefined) return message.channel.send(`That user was not found.`).then(msg => {
              msg.delete({ timeout: 12000 })
              message.delete()
          }).catch(e => { if (config.main_config.debugmode) return console.log(e);});

        const g = client.guilds.cache.get(`${message.guild.id}`)

        var somereas
          if(!args[1]) {
            somereas = 'N/A'
          } else {
            somereas = args.slice(1).join(" ").replace('"', "").replace("'", "").replace("`", "")
          }

          try {

            if(guild.member(founduser)) {


              const getBeamed = new Hyperz.MessageEmbed()
                  .setTitle(`⚠️ You've Been Banned! ⚠️`)
                  .setColor(config["main_config"].colorhex)
                  .addFields(
                    {name: `Banned By:`, value: `${message.author.tag}`, inline: true},
                    {name: `Guild:`, value: `${message.guild.name}`, inline: true},
                    {name: `Reason:`, value: `${somereas}`},
                  )
                  .setTimestamp()
                  .setFooter(`${config["main_config"].copyright}`)
                  client.users.cache.get(`${founduser.id}`, theuser => {
                    theuser.send(getBeamed).then(msg => {
                      console.log(`User was banned and got the message.`)
                    }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                  })

              try {

                setTimeout(async function(){

                g.members.ban(`${founduser.id}`, {
                  reason: `${somereas}`
                });

                await con.query(`SELECT * FROM users WHERE userid='${founduser.id}'`, async (err, row) => {
                  if(err) throw err;
                  await con.query(`UPDATE users SET bans = bans + 1 WHERE userid='${founduser.id}'`, async (err, row) => {});
                });

                await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                  let uniqueid = row[0].total + 1
                  let refinedreason = somereas.replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                  await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${founduser.id}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Ban')`, async (err, row) => {});
                });

                if(config["logging_config"].enable_punishment_logging) {

                  config["logging_config"].punishment_logging_channels.forEach(async chan => {
              
                      const thechannel = client.channels.cache.get(chan)
                      if(!thechannel) {
                          console.log("One of the channels entered in the config.json file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                      } else {
                          const logembed = new Hyperz.MessageEmbed()
                              .setColor(`${config.logging_config.punishment_logs_color || config.main_config.colorhex}`)
                              .setAuthor(`Action Logs - User Banned`, client.user.displayAvatarURL())
                              .addFields(
                                  {name: `Enforcer:`, value: `${message.author.tag}`},
                                  {name: `User ID:`, value: `${founduser.id}`},
                                  {name: `User Tag:`, value: `${founduser.tag}`},
                                  {name: `Reason:`, value: `${somereas}`},
                              )
                              .setTimestamp()
                              .setFooter(`${config["main_config"].copyright}`)
                          thechannel.send(logembed).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                      }
                  
                  }); 
          
              }

                }, 3000)

                const embed = new Hyperz.MessageEmbed()
                .setTitle("Ban Successful")
                .setColor(config["main_config"].colorhex)
                .setDescription("I have banned that user from this server.")
                .setTimestamp()
                .setFooter(`${config["main_config"].copyright}`)
                message.channel.send(embed).then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                
              } catch(e) {
                if(config["main_config"].debugmode) return console.log(e);
              }

            } else {

              con.query(`INSERT INTO offlinebans (id, reason) VALUES ('${founduser.id}', '${somereas}')`, async (err, row) => {

                const bruhfortnite = new Hyperz.MessageEmbed()
                  .setTitle("Ban Successful")
                  .setColor(config["main_config"].colorhex)
                  .setDescription("I have added that user to the offline bans database!")
                  .setTimestamp()
                  .setFooter(`${config["main_config"].copyright}`)
    
                await message.channel.send(bruhfortnite).then(msg => {
                  msg.delete({ timeout: 12000 })
                  message.delete()
                }).catch(e => {});
    
              });

            }

          } catch(e) {
            if(config["main_config"].debugmode) return console.log(e);
          }

        
      } else {
        message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
      }
  },
}