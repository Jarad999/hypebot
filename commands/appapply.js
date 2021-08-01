const moment = require('moment')
var arrayofapps = [];
module.exports = {
    name: 'appapply',
    description: 'Apply for something ig?',
    aliases: ['apply', 'application', 'form'],
    async execute(client, message, args, Hyperz, config, con){

    const filter = m => m.author.id === message.author.id;
    var t;

    try {

        const p = config.main_config.prefix

        if(message.channel.type != "dm") return message.channel.send('Please run this command in the DMs with the bot.').then(msg => {
            msg.delete({ timeout: 12000 })
            message.delete()
        }).catch(e => {if(config.main_config.debugmode) return console.log(e);});

        if(!config.applications.enabled) return message.channel.send(`This module is currently disabled.`).then(msg => {
            msg.delete({ timeout: 9000 })
        }).catch(e => {});

        config.applications.apps.forEach(async a => {
            if(a.enabled) {
                await arrayofapps.push(`${a.name} - \`${p}apply ${a.cmdname}\``);
            }
        });

        if(arrayofapps.length > config.applications.apps.length) {
            arrayofapps = []
        }

        const avail = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setDescription(`**Applications:**\n\n${arrayofapps.join("\n")}`)

        if(!args[0]) return message.channel.send(avail).catch(e => {});

        const starter = new Hyperz.MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setDescription(`Hello! Before we begin let me tell you a couple of things!\n\n1️. You're filling out an application.\n2️. This form must be filled out **HONESTLY**.\n3️. This form does **NOT** promise that you will be accepted.\n4️. If you lie on this application, you will be denied.\n\n Please send in chat **Yes** Or **No** if you agree to these terms.`)
        .setTimestamp()
        .setFooter(`${config.main_config.copyright}`)

        config.applications.apps.forEach(async a => {
            if(args[0] == a.cmdname) {

                if(!a.enabled) return message.channel.send(`That application is currently not accepting responses.`).catch(e => {});

                try {
                       message.author.send(starter).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                        .then(collected => {
                            let newcol = collected.first().content.toLowerCase()
                            if(newcol === "yes") { 
                                try {
                                    
                                    var qs = []
                                    a.questions.forEach(async q => {
                                        await qs.push(`\`${q.number}\` - ${q.content}`)
                                    });

                                    if(qs[0]) {
                                        var q0 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[0]}`)
                                    }
                                    if(qs[1]) {
                                        var q1 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[1]}`)
                                    }
                                    if(qs[2]) {
                                        var q2 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[2]}`)
                                    }
                                    if(qs[3]) {
                                        var q3 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[3]}`)
                                    }
                                    if(qs[4]) {
                                        var q4 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[4]}`)
                                    }
                                    if(qs[5]) {
                                        var q5 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[5]}`)
                                    }
                                    if(qs[6]) {
                                        var q6 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[6]}`)
                                    }
                                    if(qs[7]) {
                                        var q7 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[7]}`)
                                    }
                                    if(qs[8]) {
                                        var q8 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[8]}`)
                                    }
                                    if(qs[9]) {
                                        var q9 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[9]}`)
                                    }
                                    if(qs[10]) {
                                        var q10 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[10]}`)
                                    }
                                    if(qs[11]) {
                                        var q11 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[11]}`)
                                    }
                                    if(qs[12]) {
                                        var q12 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[12]}`)
                                    }
                                    if(qs[13]) {
                                        var q13 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[13]}`)
                                    }
                                    if(qs[14]) {
                                        var q14 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[14]}`)
                                    }
                                    if(qs[15]) {
                                        var q15 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[15]}`)
                                    }
                                    if(qs[16]) {
                                        var q16 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[16]}`)
                                    }
                                    if(qs[17]) {
                                        var q17 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[17]}`)
                                    }
                                    if(qs[18]) {
                                        var q18 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[18]}`)
                                    }
                                    if(qs[19]) {
                                        var q19 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[19]}`)
                                    }
                                    if(qs[20]) {
                                        var q20 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[20]}`)
                                    }
                                    if(qs[21]) {
                                        var q21 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[21]}`)
                                    }
                                    if(qs[22]) {
                                        var q22 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[22]}`)
                                    }
                                    if(qs[23]) {
                                        var q23 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[23]}`)
                                    }
                                    if(qs[24]) {
                                        var q24 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[24]}`)
                                    }
                                    if(qs[25]) {
                                        var q25 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[25]}`)
                                    }
                                    if(qs[26]) {
                                        var q26 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[26]}`)
                                    }
                                    if(qs[27]) {
                                        var q27 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[27]}`)
                                    }
                                    if(qs[28]) {
                                        var q28 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[28]}`)
                                    }
                                    if(qs[29]) {
                                        var q29 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[29]}`)
                                    }
                                    if(qs[30]) {
                                        var q30 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[30]}`)
                                    }
                                    if(qs[31]) {
                                        var q31 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[31]}`)
                                    }
                                    if(qs[32]) {
                                        var q32 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[32]}`)
                                    }
                                    if(qs[33]) {
                                        var q33 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[33]}`)
                                    }
                                    if(qs[34]) {
                                        var q34 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[34]}`)
                                    }
                                    if(qs[35]) {
                                        var q35 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[35]}`)
                                    }
                                    if(qs[36]) {
                                        var q36 = new Hyperz.MessageEmbed()
                                        .setColor(`${config.main_config.colorhex}`)
                                        .setDescription(`${qs[36]}`)
                                    }

                                    if(qs[0]) {
                                        try {

                                            var ans0;
                                            var ans1;
                                            var ans2;
                                            var ans3;
                                            var ans4;
                                            var ans5;
                                            var ans6;
                                            var ans7;
                                            var ans8;
                                            var ans9;
                                            var ans10;
                                            var ans11;
                                            var ans12;
                                            var ans13;
                                            var ans14;
                                            var ans15;
                                            var ans16;
                                            var ans17;
                                            var ans18;
                                            var ans19;
                                            var ans20;
                                            var ans21;
                                            var ans22;
                                            var ans23;
                                            var ans24;
                                            var ans25;
                                            var ans26;
                                            var ans27;
                                            var ans28;
                                            var ans29;
                                            var ans30;
                                            var ans31;
                                            var ans32;
                                            var ans33;
                                            var ans34;
                                            var ans35;
                                            var ans36;

                                        message.channel.send(q0).then(() => {
                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                            .then(async collected2 => {
                                                ans0 = `**Q:** ${qs[0]}\n**A:** ${collected2.first().content}`
                                                if(qs[1]) {
                                                    try {
                                                    message.channel.send(q1).then(() => {
                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                        .then(async collected2 => {
                                                            ans1 = `**Q:** ${qs[1]}\n**A:** ${collected2.first().content}`
                                                            if(qs[2]) {
                                                                try {
                                                                message.channel.send(q2).then(() => {
                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                    .then(async collected2 => {
                                                                        ans2= `**Q:** ${qs[2]}\n**A:** ${collected2.first().content}`
                                                                        if(qs[3]) {
                                                                            try {
                                                                            message.channel.send(q3).then(() => {
                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                .then(async collected2 => {
                                                                                    ans3 = `**Q:** ${qs[3]}\n**A:** ${collected2.first().content}`
                                                                                    if(qs[4]) {
                                                                                        try {
                                                                                        message.channel.send(q4).then(() => {
                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                            .then(async collected2 => {
                                                                                                ans4 = `**Q:** ${qs[4]}\n**A:** ${collected2.first().content}`
                                                                                                if(qs[5]) {
                                                                                                    try {
                                                                                                    message.channel.send(q5).then(() => {
                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                        .then(async collected2 => {
                                                                                                            ans5 = `**Q:** ${qs[5]}\n**A:** ${collected2.first().content}`
                                                                                                            if(qs[6]) {
                                                                                                                try {
                                                                                                                message.channel.send(q6).then(() => {
                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                    .then(async collected2 => {
                                                                                                                        ans6 = `**Q:** ${qs[6]}\n**A:** ${collected2.first().content}`
                                                                                                                        if(qs[7]) {
                                                                                                                            try {
                                                                                                                            message.channel.send(q7).then(() => {
                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                .then(async collected2 => {
                                                                                                                                    ans7 = `**Q:** ${qs[7]}\n**A:** ${collected2.first().content}`
                                                                                                                                    if(qs[8]) {
                                                                                                                                        try {
                                                                                                                                        message.channel.send(q8).then(() => {
                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                            .then(async collected2 => {
                                                                                                                                                ans8 = `**Q:** ${qs[8]}\n**A:** ${collected2.first().content}`
                                                                                                                                                if(qs[9]) {
                                                                                                                                                    try {
                                                                                                                                                    message.channel.send(q9).then(() => {
                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                            ans9 = `**Q:** ${qs[9]}\n**A:** ${collected2.first().content}`
                                                                                                                                                            if(qs[10]) {
                                                                                                                                                                try {
                                                                                                                                                                message.channel.send(q10).then(() => {
                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                        ans10 = `**Q:** ${qs[10]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                        if(qs[11]) {
                                                                                                                                                                            try {
                                                                                                                                                                            message.channel.send(q11).then(() => {
                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                    ans11 = `**Q:** ${qs[11]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                    if(qs[12]) {
                                                                                                                                                                                        try {
                                                                                                                                                                                        message.channel.send(q12).then(() => {
                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                ans12 = `**Q:** ${qs[12]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                if(qs[13]) {
                                                                                                                                                                                                    try {
                                                                                                                                                                                                    message.channel.send(q13).then(() => {
                                                                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                            ans13 = `**Q:** ${qs[13]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                            if(qs[14]) {
                                                                                                                                                                                                                try {
                                                                                                                                                                                                                message.channel.send(q14).then(() => {
                                                                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                        ans14 = `**Q:** ${qs[14]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                        if(qs[15]) {
                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                            message.channel.send(q15).then(() => {
                                                                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                    ans15 = `**Q:** ${qs[15]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                    if(qs[16]) {
                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                        message.channel.send(q16).then(() => {
                                                                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                ans16 = `**Q:** ${qs[16]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                if(qs[17]) {
                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                    message.channel.send(q17).then(() => {
                                                                                                                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                            ans17 = `**Q:** ${qs[17]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                            if(qs[18]) {
                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                message.channel.send(q18).then(() => {
                                                                                                                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                        ans18 = `**Q:** ${qs[18]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                        if(qs[19]) {
                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                            message.channel.send(q19).then(() => {
                                                                                                                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                    ans19 = `**Q:** ${qs[19]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                    if(qs[20]) {
                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                        message.channel.send(q20).then(() => {
                                                                                                                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                ans20 = `**Q:** ${qs[20]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                if(qs[21]) {
                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                    message.channel.send(q21).then(() => {
                                                                                                                                                                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                            ans21 = `**Q:** ${qs[21]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                            if(qs[22]) {
                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                message.channel.send(q22).then(() => {
                                                                                                                                                                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                        ans22 = `**Q:** ${qs[22]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                        if(qs[23]) {
                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                            message.channel.send(q23).then(() => {
                                                                                                                                                                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                    ans23 = `**Q:** ${qs[23]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                    if(qs[24]) {
                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                        message.channel.send(q24).then(() => {
                                                                                                                                                                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                ans24 = `**Q:** ${qs[24]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                if(qs[25]) {
                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                    message.channel.send(q25).then(() => {
                                                                                                                                                                                                                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                            ans25 = `**Q:** ${qs[25]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                            if(qs[26]) {
                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                message.channel.send(q26).then(() => {
                                                                                                                                                                                                                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                        ans26 = `**Q:** ${qs[26]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                        if(qs[27]) {
                                                                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                                                                            message.channel.send(q27).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                    ans27 = `**Q:** ${qs[27]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                    if(qs[28]) {
                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                        message.channel.send(q28).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                ans28 = `**Q:** ${qs[28]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                if(qs[29]) {
                                                                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                                                                    message.channel.send(q29).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                            ans29 = `**Q:** ${qs[29]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                            if(qs[30]) {
                                                                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                                                                message.channel.send(q30).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                        ans30 = `**Q:** ${qs[30]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                        if(qs[31]) {
                                                                                                                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                                                                                                                            message.channel.send(q31).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                    ans31 = `**Q:** ${qs[31]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                    if(qs[32]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                                                                        message.channel.send(q32).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                ans32 = `**Q:** ${qs[32]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                if(qs[33]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    message.channel.send(q33).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                            ans33 = `**Q:** ${qs[33]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                            if(qs[34]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                message.channel.send(q34).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ans34 = `**Q:** ${qs[34]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(qs[35]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            message.channel.send(q35).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ans35 = `**Q:** ${qs[35]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if(qs[36]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        message.channel.send(q36).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ans36 = `**Q:** ${qs[36]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                });
                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                                }
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                            }
                                                                                                                                                                                                        });
                                                                                                                                                                                                    });
                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                                    }
                                                                                                                                                                                                } else {
                                                                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                }
                                                                                                                                                                                            });
                                                                                                                                                                                        });
                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                                        }
                                                                                                                                                                                    } else {
                                                                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                    }
                                                                                                                                                                                });
                                                                                                                                                                            });
                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                            }
                                                                                                                                                                        } else {
                                                                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                        }
                                                                                                                                                                    });
                                                                                                                                                                });
                                                                                                                                                                } catch(e) {
                                                                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                                }
                                                                                                                                                            } else {
                                                                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                            }
                                                                                                                                                        });
                                                                                                                                                    });
                                                                                                                                                    } catch(e) {
                                                                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                                                                    }
                                                                                                                                                } else {
                                                                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        });
                                                                                                                                        } catch(e) {
                                                                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            });
                                                                                                                            } catch(e) {
                                                                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                                                                            }
                                                                                                                        } else {
                                                                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                        }
                                                                                                                    });
                                                                                                                });
                                                                                                                } catch(e) {
                                                                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                                                                }
                                                                                                            } else {
                                                                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                            }
                                                                                                        });
                                                                                                    });
                                                                                                    } catch(e) {
                                                                                                        if(config.main_config.debugmode) return console.log(e);
                                                                                                    }
                                                                                                } else {
                                                                                                    completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                }
                                                                                            });
                                                                                        });
                                                                                        } catch(e) {
                                                                                            if(config.main_config.debugmode) return console.log(e);
                                                                                        }
                                                                                    } else {
                                                                                        completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                    }
                                                                                });
                                                                            });
                                                                            } catch(e) {
                                                                                if(config.main_config.debugmode) return console.log(e);
                                                                            }
                                                                        } else {
                                                                            completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                        }
                                                                    });
                                                                });
                                                                } catch(e) {
                                                                    if(config.main_config.debugmode) return console.log(e);
                                                                }
                                                            } else {
                                                                completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                            }
                                                        });
                                                    });
                                                    } catch(e) {
                                                        if(config.main_config.debugmode) return console.log(e);
                                                    }
                                                } else {
                                                    completed(Hyperz, client, config, message, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                }
                                            });
                                        });
                                        } catch(e) {
                                            if(config.main_config.debugmode) return console.log(e);
                                        }
                                    }

                                } catch(e) {

                                    if(config.main_config.debugmode) return console.log(e);

                                }
                            } else if(newcol === "no") {
                                message.channel.send(`You are required to accept our terms to continue your app. Cancelling your application now...`).catch(e => {if(config.main_config.debugmode) return console.log(e);});
                            } else {
                                message.channel.send(`That is an invalid response. Cancelling your application now...`).catch(e => {if(config.main_config.debugmode) return console.log(e);});
                            }
                        });
                       }).catch(e => {})
                } catch(e) {
                    message.channel.send(`Please open your DM's to apply.`)
                }

            }
        });
    
    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

    },
}

async function completed(Hyperz, client, config, message, moment, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36) {
try {
    message.channel.send(`Your application has been completed, please wait for a response back, this may take awhile.`)
    
    const theguild = client.guilds.cache.get(config.main_config.yourserverid)
    if(!theguild) return console.log(theguild)

    const chantosend = theguild.channels.cache.get(a.loggingchannelid)
    if(!chantosend) return console.log(chantosend)

    let datetime = moment().format(`MM-DD-YYYY HH:mm A`)

    var log1;
    var log2;
    var log3;
    var log4;
    var log5;
    var log6;
    var log7;

    if(!ans0) {
        ans0 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans1) {
        ans1 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans2) {
        ans2 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans3) {
        ans3 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans4) {
        ans4 = '__No Question Provided (End Of Questions)__'
    }

    // up to 5
    log1 = new Hyperz.MessageEmbed()
    .setColor(`${config.main_config.colorhex}`)
    .setTitle(`${a.name} - Part 1`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans0}\n\n${ans1}\n\n${ans2}\n\n${ans3}\n\n${ans4}`)
    .setFooter(`This application only has ${qs.length} questions!`)
    chantosend.send(log1).catch(e => {
        console.log(e)
    });

    // up to 10
    if(qs[5]) {

        if(!ans5) {
            ans5 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans6) {
            ans6 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans7) {
            ans7 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans8) {
            ans8 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans9) {
            ans9 = '__No Question Provided (End Of Questions)__'
        }

        log2 = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setTitle(`${a.name} - Part 2`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans5}\n\n${ans6}\n\n${ans7}\n\n${ans8}\n\n${ans9}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send(log2).catch(e => {
            console.log(e)
        });
    }

    // up to 15
    if(qs[10]) {

        if(!ans10) {
            ans10 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans11) {
            ans11 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans12) {
            ans12 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans13) {
            ans13 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans14) {
            ans14 = '__No Question Provided (End Of Questions)__'
        }

        log3 = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setTitle(`${a.name} - Part 3`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans10}\n\n${ans11}\n\n${ans12}\n\n${ans13}\n\n${ans14}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send(log3).catch(e => {
            console.log(e)
        });
    }

    // up to 20
    if(qs[15]) {

        if(!ans15) {
            ans15 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans16) {
            ans16 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans17) {
            ans17 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans18) {
            ans18 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans19) {
            ans19 = '__No Question Provided (End Of Questions)__'
        }

        log4 = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setTitle(`${a.name} - Part 4`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans15}\n\n${ans16}\n\n${ans17}\n\n${ans18}\n\n${ans19}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send(log4).catch(e => {
            console.log(e)
        });
    }

    // up to 25
    if(qs[20]) {

        if(!ans20) {
            ans20 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans21) {
            ans21 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans22) {
            ans22 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans23) {
            ans23 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans24) {
            ans24 = '__No Question Provided (End Of Questions)__'
        }

        log5 = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setTitle(`${a.name} - Part 5`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans20}\n\n${ans21}\n\n${ans22}\n\n${ans23}\n\n${ans24}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send(log5).catch(e => {
            console.log(e)
        });
    }

    // up to 30
    if(qs[25]) {

        if(!ans25) {
            ans25 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans26) {
            ans26 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans27) {
            ans27 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans28) {
            ans28 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans29) {
            ans29 = '__No Question Provided (End Of Questions)__'
        }

        log6 = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setTitle(`${a.name} - Part 6`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans25}\n\n${ans26}\n\n${ans27}\n\n${ans28}\n\n${ans29}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send(log6).catch(e => {
            console.log(e)
        });
    }

    // up to 36
    if(qs[30]) {

        if(!ans30) {
            ans30 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans31) {
            ans31 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans32) {
            ans32 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans33) {
            ans33 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans34) {
            ans34 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans35) {
            ans35 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans36) {
            ans36 = '__No Question Provided (End Of Questions)__'
        }

        log7 = new Hyperz.MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setTitle(`${a.name} - Part 7`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans30}\n\n${ans31}\n\n${ans32}\n\n${ans33}\n\n${ans34}\n\n${ans35}\n\n${ans36}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send(log7).catch(e => {
            console.log(e)
        });
    }

} catch(e) {
    if(config.main_config.debugmode) return console.log(e);
}
}
