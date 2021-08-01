const Hyperz = require('discord.js');
const config = require('./config.json');
const client = new Hyperz.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const disbut = require('discord-buttons')(client);
const { createConnection } = require('mysql')
const con = createConnection(config["mysql"]);

if(config.giveaways_config.enabled) {
    const { GiveawaysManager } = require('discord-giveaways');
    const manager = new GiveawaysManager(client, {
        storage: './util/giveaways.json',
        updateCountdownEvery: config.giveaways_config.updateCountdownEvery,
        hasGuildMembersIntent: config.giveaways_config.hasGuildMembersIntent,
        default: {
            botsCanWin: config.giveaways_config.botsCanWin,
            embedColor: config.giveaways_config.embedColor,
            embedColorEnd: config.giveaways_config.embedColorEnd,
            reaction: config.giveaways_config.reaction
        }
    });
  client.giveawaysManager = manager;
}

client.commands = new Hyperz.Collection();
client.events = new Hyperz.Collection();
client.snipes = new Hyperz.Collection();
client.queue = new Map();

con.connect(err => {
    // Console log if there is an error
    if (err) {
        console.log(`\nAn error has occured when attempting to connect to your MySQL Database...\nERROR:\n\n${err}\n\nProcess exited to avoid further issues.`)
        process.exit()
    } else {
        // No error found?
        setTimeout(() => {
            console.log(`MySQL has been connected to ${config["mysql"].database}`);
        }, 5200)
    }
});

['Command', 'Event'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Hyperz, config, con)
})

client.login(config["main_config"].token)
