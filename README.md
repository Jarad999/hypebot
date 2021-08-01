# DISCLAIMER [MUST READ]

- This bot / repository is not for sale, and cannot be sold.
- If you decide to use a major piece of code from this project for your own work, **I REQUIRE CREDIT!**
- This bot is NOT an active representation of how I code now, this is from when I first started JS, to now, so most of the code **is** legacy.
- Please don't use this code for malicious purposes.

Previous customers before the discontinuation of this project, have been given a "coupon" to the next major project that is released. They will get it entirely free.

---

# hypebot
One of the most advanced Discord bots you will see released for free by me. Tops many of the base competitors bots.

This has been a journey of 6 months, from 1 event listener, and 5 commands. All the way to where we are now, with 12+ commands, and some 80+ commands. Along with a 300+ line config file to match everyones needs...

---

# Dependencies:

`NOTE: I will only provide support to customers with a VPS / DPS.`

[Bot Hosting](https://snowsidehosting.com/index.php?rp=/store/discord-bot-hosting) or a [VPS / DPS](https://snowsidehosting.com/index.php?rp=/store/vps)
[FFMPEG](https://www.youtube.com/watch?v=r1AtmY-RMyQ) (Required for Music)
MySQL (Required)
[NodeJS](https://nodejs.org/en/) (Required to run the bot)

---

# Install Guide

- Make sure you have downloaded [NodeJS](https://nodejs.org/en/) (get recommended)
- Open the bots folder
- Run the `Client Installer PART 1.bat` file
- Run the `Client Installer PART 2.bat` file
- Run the `Client Audit Fixer.bat` file
- Wait for it to close automatically
- Create a new database and import all of the `.sql` files inside of the `/schemas` folder **EXCLUDE THE `UPDATE.SQL` FOR FIRST TIME INSTALL!**
- Edit the `config.json` file to match your information
- Run the `Client Runner.bat` file
- Then you are done!

---

# MySQL

**The bots way of storing data!**

### This includes:
- punishments
- users stats
- sticky messages
- offline bans
- level system data

### Default Code:

```
    "mysql": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "hypebot"
    },
```

`host` - *The IP of the server hosting the DB*
`user` - *The user you wish to use on the DB (usually root)*
`password` - *The password to the user account*
`database` - *The name of the database you are storing your tables in*

---

# SQL Errors:

![](https://cdn.hyperz.dev/ytyj6ib3.png)
=
![](https://cdn.hyperz.dev/oicprnpa.png)

Both of these errors occur when the database fails to connect

---

# Setting up a MySQL Database

**Windows:**
Please refer to [this guide](https://docs.hyperz.dev/c/knowledgebase/mysql-installguide#windows)

**Linux:**
Please refer to [this guide](https://docs.hyperz.dev/c/knowledgebase/mysql-installguide#linux-ubuntu)

---

# Errors or Problems

- Go to your [Discord Developer Portal](https://discord.com/developers/applications)

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk92MrQ-42jAGM8cJG%2Fimage.png?alt=media&token=2398ef14-a152-41d5-b173-d8707257d956)

- Click on your bot application

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9FEEHgKV5s3tMWlp%2Fimage.png?alt=media&token=9b14627b-99e4-4182-8238-50d6cc841166)

- Click the category on the side labeled "bot"

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9WrgdZ96Qc_qDz0r%2Fimage.png?alt=media&token=9561e70f-e498-4158-8cd8-4972af76a834)

- Scroll down until you find this section:

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9d4iK2e1uMMCIInb%2Fimage.png?alt=media&token=6a0f6649-2392-464b-98a0-4a9461348ab7)

- Turn "Presence Intent" to `ON`

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9tG7YwsotD-9uyZ2%2Fimage.png?alt=media&token=205c9408-0f8f-4833-8968-d782bbee17a8)

- Turn "Server Members Intent" to `ON`

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9wELj5EFdshgx2bI%2Fimage.png?alt=media&token=2635ecb2-c0ae-4c98-9779-0782f9754db6)

- Once you have turned both of those on, simply click **"SAVE CHANGES"** at the bottom

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWkAMZnHS-yRu4JDQQR%2Fimage.png?alt=media&token=3e05fe9a-0fbd-47f7-9959-bb27cb7d73af)

- Then you are finished!!!!!
- Restart your bot, and then give it a shot!

---

# Client Presence

This bot has the option for `unlimited` presences!

![](https://cdn.hyperz.dev/4p5x6pf1.png)

`name` = What the bot would be doing.
`type` = The type of thing the bot is doing. (PLAYING, WATCHING, LISTENING)
`status` = The bots status (dnd, online, available, away, idle)

![](https://cdn.hyperz.dev/20ytr9ii.png)

---

# Getting IDs

- Open your Discord settings
- Scroll down and find "Appearance"
- Scroll to the bottom and find "Developer Mode"
- Turn the switch on

---

# Table Of Contents:

- [Main Configuration](h#main-configuration)
- [New Users](#new-user-config)
- [Server Stats](#server-stats-config)
- [Moderation](#moderation-config)
- [Assistant](#assistant-config)
- [Alt Prevention](#alt-prevention-config)
- [Language Filter](#filter-config)
- [Tickets](#tickets-config)
- [Giveaways](#giveaways-config)
- [Leveling](#leveling-config)
- [Reaction Roles](#reaction-roles-config)
- [Permissions](#permissions-config)
- [Logging](#logging-config)
- [Other](#other-config)

---

# Main Configuration

Any main configuration variables that weren't mentioned above, will be mentioned here.

`token` - *Your bots token, found [here](https://discord.com/developers/applications)*
`prefix` - *The calling-sign used to "get" the bot*
`license_key` - *This is to authorise that you are allowed to use HypeBot. Go to [license.hyperz.dev](https://license.hyperz.dev/) to get your key!*
`yourservername` - *If your servers name is long, use this to shorten it*
`yourserverid` - *Your servers ID*
`botownerid` - *The license owners Discord user ID*
`aboutsection` - *A brief description of your server*
`copyright` - *A simple way to label the bot for your server (you can change this...)*
`colorhex` - *The color used primarily across all embeds sidebars*
`voicechanneltojoin` - *A VC ID that the bot will join on start*

![](https://cdn.hyperz.dev/68x5dev2.png)

---

# New User Config

`enabled` - *If true, it will enable the module*
 
`useVerificationSystem` - *Decides if you want users to verify with a command before getting a member role*
`verifiedroleids` - *A list of roles that a user will get when they verify*

`useautorole` - *Decides if you want users to be given a role automatically when they join the server*
`memberroleids` - *A list of roles that will be given to users when they join the server*

`useembeds` - *Decides if you want messages to be sent via embeds or not*
`useservername` - *If you want to use your abbreviated server name from the main config*

`usejoinmessage` - *Decides if you want to have an additional message sent when they join*
`userjoinchannels` - *A list of channels to send welcome message(s) in*
`userjoinheader` - *The header of the embed when a user joins*
`userjoinmessage` - *The additional message (if enabled)*

`useleavemessage` - *Decides if you want to have an additional message sent when they leave*
`userleavechannels` - *A list of channels to send leave message(s) in*
`userleaveheader` - *The header of the embed when a user leaves*
`userleavemessage` - *The additional message (if enabled)*

![](https://cdn.hyperz.dev/kvqup2t4.png)

---

# Server Stats Config

`enabled` - *If true, it will enable the module*

`useMemberCount` - *Counts total server members, both users, and bots*
`membercountchannelid` - *A channel ID that will update on user join/leave*

`useUserCount` - *Counts strictly users, and does not include bots*
`usercountchannelid` - *A channel ID that will update on user join/leave*

`useBotCount` - *Counts strictly bots, and does not include users*
`botcountchannelid` - *A channel ID that will update on user join/leave*

![](https://cdn.hyperz.dev/5gaxiyfu.png)

---

# Moderation Config

`enabled` - *If true, it will enable the module*

`enable_dm_command` - *Enable the use of the bots DM command*
`dm_command_use_embeds` - *Decides if it should use embeds on the command entry*

`mutedroleid` - *The ID of the muted role to be given when you mute users*

![](https://cdn.hyperz.dev/krfkm3y7.png)

---

# Assistant Config

`enabled` - *If true, it will enable the module*

`usePayPal` - *Decides if you wish to use this payment method in the pay command*
`paypalLink` - *A link for them to pay you at*

`useCashApp` - *Decides if you wish to use this payment method in the pay command*
`cashappLink` - *A link for them to pay you at*

`useVenmo` - *Decides if you wish to use this payment method in the pay command*
`venmoLink` - *A link for them to pay you at*

`reviewschannelids` - *A list of channels to send new reviews*
`suggestionschannelids` - *A list of channels to send new suggestions*

`client_role_id` - *The role ID of your client's role for the clientadd / clientremove command*

`useSupportCommands` - *Decides if you want to enable support commands*
`memberSupportMessage` - *The content for the support message for members*
`customerSupportMessage` - *The content for the support message for customers*

`useListingCommand` - *Decides if you want to enable the listing command*
`noListingImageFound` - *A link for if no image is found*

`tosLink` - *A link to your Terms of Service*
`yourwebsite` - *Your website link*

![](https://cdn.hyperz.dev/jciiabai.png)

---

# Alt Prevention Config

`enabled` - *If true, it will enable the module*

`banalts` - **
`dmalts` - **

`timelimit` - *Time limit before removal in Milliseconds (look below for presets)*

```
1 Month: 2592000000
10 Days: 864000000
1 Day: 86400000
```

![](https://cdn.hyperz.dev/j5zsopb0.png)

---

# Filter Config

`enabled` - *If true, it will enable the module*

`bad_words` - *A list of words that will be deleted if said in messages*

`useMemes` - *Decides if the meme command is enabled*
`memeSubRedditName` - *A name of a subreddit to source from*

`useInsults` - *Decides if the insult command is enabled*
`insultSubRedditName` - *A name of a subreddit to source from*

`use_ping_prevention` - *Decides if it should enable the ping prevention module*
`noping_userids` - *A list of users that shouldn't be pinged*
`noping_imageurl` - *The image URL sent when a user from the list gets pinged*

![](https://cdn.hyperz.dev/bk5rfd11.png)

---

# Tickets Config

`enabled` - *If true, it will enable the module*

`useTicketReactions` - *Decides if a ticket reaction panel is / should be enabled*
`reactionPanelMessageID` - *The Message ID of the panel*
`reactionEmojiName` - *The emoji that the users should react with to create a ticket*
`ticketThumbnailURL` - *The ticket's thumbnail URL for the embed*

`ticketPanelColorHEX` - *The color HEX for the panel*
`ticketPanelThumbnailURL` - *The ticket panel's thumbnail URL for the embed*

`ticketscategoryid` - *The category tickets should be put into*
`newticketmessage` - *The message in the embed when a ticket gets opened*

![](https://cdn.hyperz.dev/3leg6kqg.png)

---

# Giveaways Config

`enabled` - *If true, it will enable the module*

`startgiveawaymessage` - *The message sent when you start a giveaway*
`endgiveawaymessage` - *The message sent when you end a giveaway*

`updateCountdownEvery` - *Every certain amount of time it will update the embed (in MS)*
`hasGuildMembersIntent` - *Literally just LEAVE THIS AS TRUE*
`botsCanWin` - *Decides if bots are allowed to win the giveaway(s)*
`embedColor` - *The color of the embeds*
`embedColorEnd` - *The color of the embeds when the giveaway ends*
`reaction` - *The emoji users react to to enter the giveaway*

![](https://cdn.hyperz.dev/n17njq6m.png)

---

# Leveling Config

`enabled` - *If true, it will enable the module*

`clearUsersOnLeave` - *Decides if you want users levels to be cleared if they leave*
`levelUpMultiplier` - *Multiplies level by this number to meet required xp for next level, read below*

```
if levelUpMultiplier = 300
1 x 300 = 300, so a user needs 300xp for the next level (2)
2 x 300 = 600, so a user needs 600xp for the next level (3)
3 x 300 = 900, so a user needs 900xp for the next level (4)

if levelUpMultiplier = 2
1 x 2 = 2, so a user needs 2xp for the next level (2)
2 x 2 = 4, so a user needs 4xp for the next level (3)
3 x 2 = 6, so a user needs 6xp for the next level (4)

Conclusion: keep this number high, it ensures more activity!!! :]
```

`moreXPForAttachments` - *Decides if users should get more XP for posting images / attachments*
`attachmentsBonus` - *Number of bonus XP added for attachments, keep this number low, like 4*

`moreXPForLongerMessages` - *Decides if users should get more XP for posting longer messages*
`msgCharacterRequirement` - *Number of characters required for bonus XP, keep this number high, like 650*
`longerMSGSBonus` - *Number of bonus XP added for longer messages, keep this number low, like 5*

![](https://cdn.hyperz.dev/q1hcp3dk.png)

---

# Reaction Roles Config

This bot supports unlimited reaction roles! With an advanced array method that will be broken down below:

You have to add the reactions first, THEN start the bot, and people will then ADD to your reactions, and the bot will remove them for you.

`enabled` - *If true, it will enable the module*

`roleid` - *The role to be given / removed*
`messageid` - *The message ID of the message you want people to react to*
`workflow` - *The type, 1 = Add role, don't remove it, 2 = Remove role, don't add it, 3 = Add OR Remove role*
`reactionname` - *The actual emoji you want to be reacted to, press `WINDOWS KEY + .` or get them [here](https://emojipedia.org/).*

![](https://cdn.hyperz.dev/lrhl4e8w.png)

---

# Permissions Config

`staffperms` - *A list of roles that should have access to staff perms*
`blacklistperms` - *A list of roles that should have access to blacklist commands*
`ticketmanagers` - *A list of roles that should have access to tickets perms*
`assistantmanagers` - *A list of roles that should have access to assistant commands*
`revivechatperms` - *A list of roles that should have access to revive perms*
`stickymsgperms` - *A list of roles that should have access to sticky message editing*
`giveawayperms` - *A list of roles that should have access to giveaway perms*
`serverlockperms` - *A list of roles that should have access to server lockdown command*
`bypassfilters` - *A list of roles that should have access to bypass the filters module*

![](https://cdn.hyperz.dev/59g7f5v8.png)

---

# Logging Config

`enable_deleted_messages_logging` - *Decides if this logging type should be enabled*
`deleted_messages_channels` - *A list of channels this logging type should be sent to*

`enable_edited_messages_logging` - *Decides if this logging type should be enabled*
`edited_messages_channels` - *A list of channels this logging type should be sent to*

`enable_channel_logging` - *Decides if this logging type should be enabled*
`channel_logging_channels` - *A list of channels this logging type should be sent to*

`enable_role_logging` - *Decides if this logging type should be enabled*
`role_logging_channels` - *A list of channels this logging type should be sent to*

`enable_command_logging` - *Decides if this logging type should be enabled*
`command_logging_channels` - *A list of channels this logging type should be sent to*

`enable_invite_logging` - *Decides if this logging type should be enabled*
`invite_logging_channels` - *A list of channels this logging type should be sent to*

`enable_ticketarchive_logging` - *Decides if this logging type should be enabled*
`ticketarchive_logging_channels` - *A list of channels this logging type should be sent to*

`enable_botsdm_logging` - *Decides if this logging type should be enabled*
`botsdm_logging_channels` - *A list of channels this logging type should be sent to*

`enable_serverlock_logging` - *Decides if this logging type should be enabled*
`serverlock_logging_channels` - *A list of channels this logging type should be sent to*

`enable_altprev_logging` - *Decides if this logging type should be enabled*
`altprev_logging_channels` - *A list of channels this logging type should be sent to*

![](https://cdn.hyperz.dev/g6effwaf.png)

---

# Other Config

`usemusic` - *Decides if the bot should enable music*
`deleteSnipes` - *Decides if the bot should delete messages after they are sniped*

`enableBlacklisting` - *Decides if the blacklisting module should be enabled*
`logBlacklistsChannels` - *A list of channels that blacklists will be logged to*
`blacklistedRoleID` - *The role for blacklisted users*
`roleToGiveWhenUnBlacklisted` - *Usually your member role*
`addBlacklistImageURL` - *The image URL for when a user is blacklisted*
`removeBlacklistImageURL` - *The image URL for when a user is un-blacklisted*
`autoBanImageURL` - *The image URL for when a user is blacklisted and gets banned for leaving*

`useReviver` - *Decides if the reviver module is enabled*
`reviver_messages` - *A list of messages that the bot will selecting randomly from*
`deadChatPingsRoleID` - *A role ID to ping when a reviver message is sent, usually a chat revive role*
`reviverlogourl` - *The logo for the embed when the reviver command is sent*

`serverinvite` - *An invite to your server*
`staple_never_change` - *Just don't change this, it helps me keep track of bot versions lol*

![](https://cdn.hyperz.dev/u66alq5c.png)

---

---

# Port Requirement

The bot uses a port so it can simply detect whether or not it is online via a "status" page.
**Example:** https://status.hyperz.dev/

![](https://cdn.hyperz.dev/9hiw3pos.png)

---

# Debug Mode

Debug mode is STRICTLY designed to show the errors the bot has. Most errors will not be sent in console while `debugmode` is set to `false`. This allows users to keep their console clean and collected!

![](https://cdn.hyperz.dev/6vwqjtj2.png)

---

