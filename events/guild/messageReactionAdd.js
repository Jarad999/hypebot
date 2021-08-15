const fs = require('fs');

module.exports = async (client, Hyperz, config, con, reaction, user) => {

  if (reaction.message.partial) await reaction.message.fetch();

  try {

  if(user.bot) {

  } else {

    if(!reaction.message.guild) return;

    if(config.reactionroles.enabled) {
      config.reactionroles.reactions.forEach(r => {
        if(reaction.message.id == r.messageid && reaction.emoji.name == r.reactionname) {
          let somerole = reaction.message.channel.guild.roles.cache.get(r.roleid);
          if(!somerole) return console.log(`A Reaction Roles Role ID is incorrect...`);
          if(r.workflow == 1) {
            reaction.message.guild.member(user).roles.add(somerole).catch(e => {console.log(e)});
          } else if(r.workflow == 2) {
            reaction.message.guild.member(user).roles.remove(somerole).catch(e => {console.log(e)});
          } else if (r.workflow == 3) {
              if(!reaction.message.guild.member(user).roles.cache.has(somerole.id)) {
                reaction.message.guild.member(user).roles.add(somerole).catch(console.error);
              } else {
                  reaction.message.guild.member(user).roles.remove(somerole).catch(console.error);
              }
          } else {
            console.log(`Invalid Workflow Entry VIA Reaction Roles...`);
          }
          reaction.users.remove(user);
        }
      });
    }

  if(config["tickets_config"].enabled) {

    if(config["tickets_config"].useTicketPanel) {

      if(config["tickets_config"].reactionPanelMessageID === `${reaction.message.id}`) {

  const guild = client.guilds.cache.get(config["main_config"].yourserverid);

  if(reaction.message.guild.id === config["main_config"].yourserverid) {

  if (reaction.emoji.name === `${config["tickets_config"].reactionEmojiName}`) {

    reaction.users.remove(user.id);
    if(reaction.message.guild.id === config["main_config"].yourserverid) {

    var max = config.tickets_config.maxtickets
    var bruh = 0
                    
    await guild.channels.cache.forEach(c => {
        if(c.name === `ticket-${user.username.toLowerCase()}`) {
            bruh = bruh + 1
        }
    });

    if(bruh >= max) return reaction.message.channel.send(`You may only have **${max} ticket(s)** open at a time.`).then(msg => {
        msg.delete({ timeout: 3000 })
        bruh = 0
    }).catch(e => { if(config.main_config.debugmode) return console.log(e); });

    bruh = 0

      const origin = reaction.message
      if (config["tickets_config"].enabled == true) {
          let everyoneRole = reaction.message.guild.roles.cache.find(role => role.name === "@everyone");
          let permissionOverwriteArray = [{
                  id: user.id,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
              },
              {
                  id: everyoneRole.id,
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
              },
              {
                  id: client.user.id,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
              },
          ]
          config.permissions_config.ticketmanagers.forEach(role => {
              let yeet = reaction.message.guild.roles.cache.get(role);
              if (!yeet) {
                  console.log(`${role} is not in the server`)
              } else {
                  let tempArray = {
                      id: role,
                      allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                  }
                  permissionOverwriteArray.push(tempArray);
              }
          })
          let hello = await guild.channels.create(`ticket-${user.username}`, {
              type: 'text',
              permissionOverwrites: permissionOverwriteArray
          }).catch(e => {
               
              if (e) console.log(`I was not able to make a channel in  ${message.guild.id} || ${message.guild.name}`);
              origin.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);})
          }).then(chan => {
              if(config["tickets_config"].usecategory = true){
              chan.setParent(config["tickets_config"].ticketscategoryid, {lockPermissions: false})
              const ticketchannelembed2 = new Hyperz.MessageEmbed()
                  .setColor(config["main_config"].colorhex)
                  .setTitle(`Ticket:`)
                  .setURL(`${config["other_configuration"].serverinvite}`)
                  .setThumbnail(config["tickets_config"].ticketThumbnailURL)
                  .setDescription(config["tickets_config"].newticketmessage)
                  .setTimestamp()
                  .setFooter(`${config["main_config"].copyright}`)
  
              chan.send(ticketchannelembed2)
              if(config.tickets_config.pingRoleOnTicketOpen) {
                    chan.send(`<@&${config.tickets_config.roleIdToPing}>`)
              }
              chan.overwritePermissions(permissionOverwriteArray)
              } else {
              chan.overwritePermissions(permissionOverwriteArray)
              const ticketchannelembed2 = new Hyperz.MessageEmbed()
                  .setColor(config["main_config"].colorhex)
                  .setTitle(`Ticket:`)
                  .setURL(`${config["other_configuration"].serverinvite}`)
                  .setThumbnail(config["tickets_config"].ticketThumbnailURL)
                  .setDescription(config["tickets_config"].newticketmessage)
                  .setTimestamp()
                  .setFooter(`${config["main_config"].copyright}`)
  
              chan.send(ticketchannelembed2)
              if(config.tickets_config.pingRoleOnTicketOpen) {
                    chan.send(`<@&${config.tickets_config.roleIdToPing}>`)
              }
          }
          })
          if (hello == undefined) return;
          message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

      } 
  } 

  }
}
  }
}
  }
}
  } catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
  }
}
