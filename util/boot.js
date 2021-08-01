const chalk = require('chalk')
const config = require('../config.json');
const harddata = require('./dadata.json')
const nodelogger = require('hyperz-nodelogger')
const logger = new nodelogger()


module.exports = {
    async startupScreen(client) {

        try {

                let consoleArt = `Logged in as ${client.user.tag} (${chalk.green(client.user.id)})\nOnline for ${chalk.green(client.guilds.cache.size)} guilds and ${chalk.green(client.users.cache.size)} users.\n\nPrefix: ${chalk.blue(config["main_config"].prefix)} (Default)\nCommands: ${harddata.main.commands}\nEvents: ${harddata.main.events}\nCreated By: ${chalk.blue(`Hyperz#0001`)}\n\nDebug Mode: ${chalk.yellow(config["main_config"].debugmode)}\n\n Support available at ${chalk.blue(`https://support.hyperz.dev/`)}`

                logger.hypelogger(`HypeBot`, '500', 'blue', consoleArt, 'disabled', 'blue', 'single', true)

                setTimeout(async () => {
                    console.log(` \n `)
                    console.log(`------ CONSOLE LOGGING BEGINS BELOW ------`)
                    console.log(` \n `)

                    const channel = client.channels.cache.get(config["main_config"].voicechanneltojoin);
                    if (!channel) return console.error("The voice channel does not exist (change main_config's voicechanneltojoin)!");
                    channel.join().then(connection => {
                        console.log("Successfully connected to the voice channel!")
                    }).catch(e => {
                        console.error(e);
                    });
                }, 2000)

        } catch(e) {
            if(config["main_config"].debugmode) return console.log(e);
        }

    }
}
