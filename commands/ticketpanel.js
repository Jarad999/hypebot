const { MessageButton } = require('discord-buttons')
module.exports = {
    name: 'ticketpanel',
    description: 'Creates a panel for tickets.',
    aliases: ['newpanel', 'createpanel', 'panelticket', 'panel'],
    async execute(client, message, args, Hyperz, config, con){

        if(message.guild.id === config["main_config"].yourserverid) {
            if(config["tickets_config"].enabled) {
                if(config["tickets_config"].useTicketPanel) {
                    if(config.tickets_config.useButtonsReplacement) {

                        const per = config["permissions_config"].ticketmanagers
                        if(message.member.roles.cache.some(h=>per.includes(h.id))){

                            let deButton = config["tickets_config"].buttonName

                            try {
                                const myButton = new MessageButton()
                                .setLabel(`${deButton}`)
                                .setStyle(`${config.tickets_config.buttonStyle}`)
                                .setID('ticketpanel')
                        
                                const panelEmbed = new Hyperz.MessageEmbed()
                                .setColor(config["tickets_config"].ticketPanelColorHEX)
                                .setTitle(`Create A Ticket:`)
                                .setDescription(args.join(" ") || `Simply **press** the below button to create a new ticket!`)
                                .setThumbnail(config["tickets_config"].ticketPanelThumbnailURL)
                                .setTimestamp()
                                .setFooter(`${config["main_config"].copyright}`)
                            
                                await message.channel.send({ embed: panelEmbed, buttons: myButton }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);}); 
                            } catch(e) {
                                if(config["main_config"].debugmode) return console.log(e);
                            }

                        } else {
                            message.channel.send(`You don't have permission to use this command.`).then(msg => {
                                client.setTimeout(() => msg.delete(), 10000)
                                message.delete()
                            }).catch(e => {});
                        }
                    } else {
                    
                        const per = config["permissions_config"].ticketmanagers
                        if(message.member.roles.cache.some(h=>per.includes(h.id))){

                        let deReaction = config["tickets_config"].reactionEmojiName

                        const panelEmbed = new Hyperz.MessageEmbed()
                        .setColor(config["tickets_config"].ticketPanelColorHEX)
                        .setTitle(`Create A Ticket:`)
                        .setDescription(args.join(" ") || `Simply **press** the below button to create a new ticket!`)
                        .setThumbnail(config["tickets_config"].ticketPanelThumbnailURL)
                        .setTimestamp()
                        .setFooter(`${config["main_config"].copyright}`)
                    
                        message.channel.send(panelEmbed).then(async msg => {
                            await msg.react(deReaction)
                        }).catch(e => {if(config["main_config"].debugmode) return console.log(e);})

                        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);}); 

                        } else {
                            message.channel.send(`You don't have permission to use this command.`).then(msg => {
                                client.setTimeout(() => msg.delete(), 10000)
                                message.delete()
                            }).catch(e => {});
                        }
                    }
                }
            }
        }
    },
}