module.exports = {
    name: 'pay',
    description: 'A command.',
    aliases: ['payment', 'charge'],
    async execute(client, message, args, Hyperz, config, con){
        if(message.guild.id === config["main_config"].yourserverid) {
        if(config["assistant_config"].enabled) {
            const per = config["permissions_config"].assistantmanagers
            if(message.member.roles.cache.some(h=>per.includes(h.id))){
            if(config["assistant_config"].usePayPal) {
                const paypalEmbed = new Hyperz.MessageEmbed()
                .setColor('#0567f0')
                .addFields(
                    { name: 'PayPal:', value: `**${config["assistant_config"].paypalLink}**`},
                )

                message.channel.send(paypalEmbed)
            }

            if(config["assistant_config"].useCashApp) {
                const cashappEmbed = new Hyperz.MessageEmbed()
                .setColor('#42f54e')
                .addFields(
                    { name: 'CashApp:', value: `**${config["assistant_config"].cashappLink}**`},
                )

                message.channel.send(cashappEmbed)
            }

            if(config["assistant_config"].useVenmo) {
                const venmoEmbed = new Hyperz.MessageEmbed()
                .setColor('#05c5f0')
                .addFields(
                    { name: 'Venmo:', value: `**${config["assistant_config"].venmoLink}**`},
                )

                message.channel.send(venmoEmbed)
            }

                const sayEmbed = new Hyperz.MessageEmbed()
                .setColor(config["main_config"].colorhex)
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`, `${config["other_configuration"].serverinvite}`)
                .setTimestamp()
                .setFooter(`${config["main_config"].copyright}`)
                .addFields(
                    { name: 'Notice:', value: `The amount due today is: **${args.join(" ")}**.`},
                )

                message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
                message.channel.send(sayEmbed)

        } else {
            message.channel.send("This module is disabled, please ask the owner to enable it!").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        }

    }
} else {
    message.channel.send("This command can only be ran inside of the main server.").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
    message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
}
}
}

