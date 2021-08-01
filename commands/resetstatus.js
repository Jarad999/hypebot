module.exports = {
    name: 'resetstatus',
    description: 'For those of you who have hosting issues...',
    aliases: ['statusreset', 'status', 'statusrefresh', 'refreshstatus', 'setstatus'],
    async execute(client, message, args, Hyperz, config, con){

        try {

            let statuses = [
                { activity: { name: `${config["presence_config"].presname1}`, type: `${config["presence_config"].prestype1}` }, status: `${config["presence_config"].presstatus1}` },
                { activity: { name: `${config["presence_config"].presname2}`, type: `${config["presence_config"].prestype2}` }, status: `${config["presence_config"].presstatus2}` },
                { activity: { name: `${config["presence_config"].presname3}`, type: `${config["presence_config"].prestype3}` }, status: `${config["presence_config"].presstatus3}` }
            ];

            let i = 0;
            setInterval(() => {
                let status = statuses[i];
                if (!status) {
                    status = statuses[0];
                    i = 0;
                }
                client.user.setPresence(status);
                i++;
            }, config["presence_config"].preschangetimer);

            message.channel.send(`Status Refreshed...`).then(msg => msg.delete({ timeout: 12000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});

        } catch(e) {
            if(config["main_config"].debugmode) return console.log(e);
        }
            
    }
}