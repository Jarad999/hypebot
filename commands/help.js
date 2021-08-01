const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
    name: 'help',
    description: 'Shows all commands for the bot.',
    aliases: ['helpmenu', 'helpme'],
    async execute(client, message, args, Hyperz, config, con){

        try {

        const page1 = new Hyperz.MessageEmbed()
        .setTitle(`${client.user.username} Help Menu`)
        .setColor(`${config["main_config"].colorhex}`)
        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
        .addFields(
            {name: `Bot Name:`, value: `\`${client.user.username}\``, inline: true},
            {name: `Bot Prefix:`, value: `\`${config["main_config"].prefix}\``, inline: true},
            {name: `About Server:`, value: `${config["main_config"].aboutsection}`},
            {name: `Copyright:`, value: `${config["main_config"].copyright}\n \n`, inline: true},
        )
        .setTimestamp()
        .setFooter(`Page 1/8`)

        const home = new MessageButton()
        .setLabel(`${config.help_menu.emojis.home} Home Section`)
        .setStyle(`green`)
        .setID('home');
        
        const userCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.user} User Commands`)
        .setStyle(`gray`)
        .setID('userCommands');

        const musicCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.music} Music Commands`)
        .setStyle(`gray`)
        .setID('musicCommands');

        const ticketsCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.tickets} Ticket Commands`)
        .setStyle(`gray`)
        .setID('ticketsCommands');

        const supportCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.support} Support Commands`)
        .setStyle(`gray`)
        .setID('supportCommands');

        const staffCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.staff} Staff Commands`)
        .setStyle(`gray`)
        .setID('staffCommands');

        const otherCommands = new MessageButton()
        .setLabel(`${config.help_menu.emojis.other} Other Commands`)
        .setStyle(`gray`)
        .setID('otherCommands');

        const credits = new MessageButton()
        .setLabel(`${config.help_menu.emojis.credits} Credits Section`)
        .setStyle(`blurple`)
        .setID('credits');

        const ad = new MessageButton()
        .setLabel(`${config.help_menu.emojis.hypebot} Buy Me Today!`)
        .setStyle(`url`)
        .setURL("https://hyperz.dev/store/hypebot")

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

        await message.channel.send({ embed: page1, components: [toprow, middlerow, bottomrow] }).catch(e => { console.log(e) })

        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

    } catch(e) {
        console.log(e)
    }

    }
}