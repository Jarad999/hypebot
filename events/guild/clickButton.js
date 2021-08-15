const fs = require('fs');
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = async (client, Hyperz, config, con, button) => {

  try {

  if(button.clicker.user.bot) {

  } else {

        var edited;
        edited = new Hyperz.MessageEmbed()

        var home;
        var userCommands;
        var musicCommands;
        var ticketsCommands;
        var supportCommands;
        var staffCommands;
        var otherCommands;
        var credits;

        home = new MessageButton()
        .setLabel(`${config.help_menu.emojis.home} Home Section`)
        .setStyle(`blurple`)
        .setID('home');
        
        userCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.user} User Commands`)
        .setStyle(`gray`)
        .setID('userCommands');

        musicCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.music} Music Commands`)
        .setStyle(`gray`)
        .setID('musicCommands');

        ticketsCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.tickets} Ticket Commands`)
        .setStyle(`gray`)
        .setID('ticketsCommands');

        supportCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.support} Support Commands`)
        .setStyle(`gray`)
        .setID('supportCommands');

        staffCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.staff} Staff Commands`)
        .setStyle(`gray`)
        .setID('staffCommands');

        otherCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.other} Other Commands`)
        .setStyle(`gray`)
        .setID('otherCommands');

        credits = new MessageButton()
        .setLabel(`${config.help_menu.emojis.credits} Credits Section`)
        .setStyle(`blurple`)
        .setID('credits');

        ad = new MessageButton()
        .setLabel(`${config.help_menu.emojis.hypebot} Buy Me Today!`)
        .setStyle(`url`)
        .setURL("https://hyperz.dev/store/hypebot")

        if(button.id === 'home') {
            button.defer()
                try {

                    home = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.home} Home Section`)
                    .setStyle(`green`)
                    .setID('home');

                    edited.fields = []
                    edited.setTitle(`${client.user.username} Help Menu`), 
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.addFields(
                        {name: `Bot Name:`, value: `\`${client.user.username}\``, inline: true},
                        {name: `Bot Prefix:`, value: `\`${config["main_config"].prefix}\``, inline: true},
                        {name: `About Server:`, value: `${config["main_config"].aboutsection}`},
                        {name: `Copyright:`, value: `${config["main_config"].copyright}\n \n`, inline: true},
                    ),
                    edited.setFooter(`Page 1/8`)

                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    await button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'credits') {
            button.defer()
                try {

                    credits = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.credits} Credits Section`)
                    .setStyle(`green`)
                    .setID('credits');

                    edited.fields = []
                    edited.setTitle(`Bot Credits`)
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.addFields(
                        {name: `Main Credits:`, value: "[@Hyperz#0001](https://hyperz.dev/discord) - *Head Developer of the HypeBot Project.*\n[@PlutoTheDev#1000](https://plutothe.dev) - *Helped with Ticket Module & Re-wrote useless stuff.*\n[@FAXES#8655](https://faxes.zone) - *Inspiration for the bot.*\n"},
                        {name: `Other Credits:`, value: "[@StackOverflow](https://stackoverflow.com) - *Helpful with bug testing and gathering excess code.*\n[@DJS-Guide](https://discord.js.org) - *Huge documentation with large detail on syntax.*\n[@GitHub](https://github.com) - *Where the music module came from before the V12 Update & Bug Fixes.*\n"},
                        {name: `Bug Testing:`, value: "[@JipyTheDev](https://jipythedev.xyz) - *Literally Everything.*\n[@KingEZFLOW#5661](https://ezflow.dev) - *Ticket System & Moderation Commands.*\n[@Jordan.#2139](https://rocketdev.zone) - *Moderation Commands.*\n[@Chr!s#6814](#) - *Greeting Module.*"},
                    )
                    edited.setFooter(`Page 8/8`)

                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'userCommands') {
            button.defer()
                try {

                    userCommands = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.user} User Commands`)
                    .setStyle(`green`)
                    .setID('userCommands');

                    edited.fields = []
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.setTitle(`User Commands`)
                    edited.setDescription("`avatar` - Find the avatar of a user.\n`hug` - Hug someone.\n`creator` - Learn who made the bot.\n`dice` - Get a random number.\n`level` - See a users current level.\n`lb` - See the guilds leaderboard.\n`apply` - Apply for something.\n`punishments` - Check a users punishments.\n`help` - Get a list of everything you need to know.\n`timer` - Set a timer for something.\n`meme` - Gets a meme lmao.\n`insult` - Literally just insults someone.\n`ping` - Check to see if the bot is online.\n`invite` - Get an invite to the server.\n`suggest` - Leave a suggestion to add to the server.\n`user` - Find out more about a user.\n`server` - Find out more about the server.\n`snipe` - Gets the last deleted message.\n`version` - Learn what the current version of the bot is.\n`website` - Get a link to the servers website.")
                    edited.setFooter(`Page 2/8`)
                    
                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);

                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)

                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'musicCommands') {
            button.defer()
                try {

                    musicCommands = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.music} Music Commands`)
                    .setStyle(`green`)
                    .setID('musicCommands');
                    
                    edited.fields = []
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.setTitle(`Music Commands`)
                    edited.setDescription("`afk` - Stops the bot from leaving after queue ends.\n`loop` - Loops the current queue.\n`lyrics` - Attempts to fetch the lyrics of the current song.\n`nowplaying` - Shows the currently playing song.\n`pause` - Pauses the music.\n`play` - Searches YouTube for your song name OR song URL.\n`playlist` - Plays a playlist from YouTube.\n`queue` - Shows all songs in the queue.\n`remove` - Remove a song from the queue (by #).\n`resume` - Continues playing the paused music!\n`shuffle` - Shuffles & randomize the queue order.\n`skip` - Skips the currently playing song.\n`skipto` - Skips to a specified # in the queue order.\n`stop` - Stops the music and clears the queue.\n`volume` - Change the volume of the music via the bot.")
                    edited.setFooter(`Page 3/8`)
                    
                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'ticketsCommands') {
            button.defer()
                try {

                    ticketsCommands = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.tickets} Ticket Commands`)
                    .setStyle(`green`)
                    .setID('ticketsCommands');

                    edited.fields = []
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.setTitle(`Ticket Commands`)
                    edited.setDescription("`ticket` - Opens a new ticket.\n`ticket [reason]` - Opens a new ticket with a reason.\n`archive` - Archive and create a transcript of the ticket.\n`close` - Close the ticket without a transcript.\n`adduser` - Add a user to a ticket.\n`removeuser` - Remove a user from a ticket.\n`rename` - Rename a ticket.\n`claim` - Claim a Ticket in the server.\n`unclaim` - Un-claim a Ticket in the server.\n`intro` - Send an introductory message in a ticket.\n`outro` - Announce you are leaving / closing the ticket.")
                    edited.setFooter(`Page 4/8`)
                    
                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'supportCommands') {
            button.defer()
                try {

                    supportCommands = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.support} Support Commands`)
                    .setStyle(`green`)
                    .setID('supportCommands');

                    edited.fields = []
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.setTitle(`Support Commands`)
                    edited.setDescription("`pay [amount]` - Sends a payment request via embed.\n`review [# of stars] [message]` - Leave a review for the team.\n`tos` - Sends a request via embed for the user to agree to the ToS.\n`clientadd` - Gives a user the client role.\n`clientremove` - Removes a users client role.\n`msupport` - Alerts a member to use support channels.\n`csupport` - Alerts a customer to use support channels.")
                    edited.setFooter(`Page 5/8`)
                    
                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'staffCommands') {
            button.defer()
                try {

                    staffCommands = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.staff} Staff Commands`)
                    .setStyle(`green`)
                    .setID('staffCommands');

                    edited.fields = []
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.setTitle(`Staff Commands`)
                    edited.setDescription("`poll` - Create a poll for users to respond to.\n`say` - Echo a message as the bot.\n`embed` - Send an embed as the bot.\n`anonembed` - Sends an embed without an author.\n`buildembed` - Build your own custom embed.\n`list (message) [img-link-in-brackets]` - Creates a new listing.\n`panel` - Create a new ticket-reaction panel.\n`blacklist` - Shadow Ban a user from the server.\n`unblacklist` - Un-Shadow Ban a user from the server.\n`reviver` - Posts a random question and pings a role to get the server's attention.\n`kick` - Kick a member of the server by pinging them.\n`ban` - Ban a member of the server by pinging them.\n`unban` - Unban a user of the server by ID.\n`mute` - Mute a member of the server.\n`unmute` - Unmute a member of the server.\n`warn` - Warn a member of the server.\n`case` - Find a case by ID.\n`removecase` - Delete a case from the DB by Case ID.\n`purge` - Bulk delete a # of messages.")
                    edited.setFooter(`Page 6/8`)
                    
                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

        if(button.id === 'otherCommands') {
            button.defer()
                try {

                    otherCommands = new MessageButton()
                    .setLabel(`${config.help_menu.emojis.other} Other Commands`)
                    .setStyle(`green`)
                    .setID('otherCommands');

                    edited.fields = []
                    edited.setColor(`${config["main_config"].colorhex}`),
                    edited.setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`),
                    edited.setTitle(`Other Commands`)
                    edited.setDescription("**Giveaway Commands:**\n`gcreate` - Create a giveaway.\n`greroll` - Re-roll a giveaway.\n`gdelete` - Delete a giveaway.\n`gend` - End a giveaway.\n\n**More Commands:**\n`serverlock` - Stop all users from joining your server.\n`slowmode` - Sets a channels rate limit (rounds in seconds).\n`stickyadd` - Add a sticky message to a channel.\n`stickyremove` - Remove a sticky message from a channel.\n`unbanall` - Remove all of your servers current bans.\n`restart` - Restart the bot.")
                    edited.setFooter(`Page 7/8`)
                    
                    const toprow = new MessageActionRow()
                    .addComponent(home)
                    .addComponent(credits)
                    .addComponent(ad);
            
                    const middlerow = new MessageActionRow()
                    .addComponent(userCommands)
                    .addComponent(musicCommands)
                    .addComponent(ticketsCommands)
            
                    const bottomrow = new MessageActionRow()
                    .addComponent(supportCommands)
                    .addComponent(staffCommands)
                    .addComponent(otherCommands)

                    button.message.edit({ embed: edited, components: [toprow, middlerow, bottomrow] })
                } catch(e) {
                    console.log(e)
                }
        }

    // Ticket system for buttons is below here

  if(config["tickets_config"].enabled) {

    if(config["tickets_config"].useTicketPanel) {

      if(button.id === 'ticketpanel') {

        if(!config.tickets_config.useButtonsReplacement) return;

    const guild = client.guilds.cache.get(config["main_config"].yourserverid);
        
    var max = config.tickets_config.maxtickets
    var bruh = 0
                    
    await guild.channels.cache.forEach(c => {
        if(c.name === `ticket-${button.clicker.user.username.toLowerCase()}`) {
            bruh = bruh + 1
        }
    });

    if(bruh >= max) return button.message.channel.send(`You may only have **${max} ticket(s)** open at a time.`).then(msg => {
        msg.delete({ timeout: 3000 })
        button.defer()
        bruh = 0
    }).catch(e => { if(config.main_config.debugmode) return console.log(e); });

    bruh = 0
        const origin = button.message
      if (config["tickets_config"].enabled == true) {
          button.defer()
          let everyoneRole = guild.roles.cache.find(role => role.name === "@everyone");
          let permissionOverwriteArray = [{
                  id: button.clicker.user.id,
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
              let yeet = button.message.guild.roles.cache.get(role);
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
          let hello = await guild.channels.create(`ticket-${button.clicker.user.username.toLowerCase()}`, {
              type: 'text',
              permissionOverwrites: permissionOverwriteArray
          }).catch(e => {
               
              if (e) console.log(`I was not able to make a channel in  ${button.guild.id} || ${button.guild.name}`);
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
              chan.overwritePermissions(permissionOverwriteArray)
              chan.send(`<@&${config.tickets_config.roleIdToPing}>`)
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
              chan.send(`<@&${config.tickets_config.roleIdToPing}>`)
          }
          })
          if (hello == undefined) return;

      } 
  }
}
  }
}
  } catch(e) {
    if(config["main_config"].debugmode) return console.log(e);
  }
}
