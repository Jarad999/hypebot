module.exports = {
    name: 'embedbuilder',
    description: 'A command.',
    aliases: ['buildembed', 'advembed', 'advancedembed', 'makeembed', 'newembed'],
    async execute(client, message, args, Hyperz, config, con){
    const per = config["permissions_config"].staffperms
    if(message.member.roles.cache.some(h=>per.includes(h.id))){

      var thechannel;
      const filter = m => m.author.id === message.author.id;

      const starter = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`**EMBED BUILDER STARTED!**\nType \`end\` to cancel the builder.`)

      const builder0 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define a **channel** to put this embed in.`)

      const builder1 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define an **author**.\nType \`na\` to skip this step.`)

      const builder2 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define a **color HEX**.\nType \`na\` to skip this step.`)

      const builder3 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define a **title**.\nType \`na\` to skip this step.`)

      const builder4 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define a **thumbnail image link**.\nType \`na\` to skip this step.`)

      const builder5 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define a **description**.\nType \`na\` to skip this step.`)

      const builder6 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define an **image link**.\nType \`na\` to skip this step.`)

      const builder7 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`Please define a **footer**.\nType \`na\` to skip this step.`)

      const finish1 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`**Embed is being built...**`)

      const finish2 = new Hyperz.MessageEmbed()
      .setColor(`${config.main_config.colorhex}`)
      .setDescription(`**Embed has been posted!**`)

      message.channel.send(starter).catch(e => {});

      message.channel.send(builder0).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
        .then(collected => {
            let content0l = collected.first().content.toLowerCase()
            let content0 = collected.first().content

            if(content0l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});

            if(collected.first().mentions.channels.first()) {
              thechannel = collected.first().mentions.channels.first().id
            } else if(!isNaN(collected.first().content)) {
              thechannel = collected.first().content
            }

            if(thechannel == undefined) return message.channel.send(`Embed process cancelled, I was unable to find the provided channel.`);

            message.channel.send(builder1).then(() => {
              message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
              .then(collected => {
                  let content1l = collected.first().content.toLowerCase()
                  let content1 = collected.first().content
      
                  if(content1l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
      
                  message.channel.send(builder2).then(() => {
                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                    .then(collected => {
                        let content2l = collected.first().content.toLowerCase()
                        let content2 = collected.first().content
            
                        if(content2l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
            
                        message.channel.send(builder3).then(() => {
                          message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                          .then(collected => {
                              let content3l = collected.first().content.toLowerCase()
                              let content3 = collected.first().content
                  
                              if(content3l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
                  
                              message.channel.send(builder4).then(() => {
                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                .then(collected => {
                                    let content4l = collected.first().content.toLowerCase()
                                    let content4 = collected.first().content
                        
                                    if(content4l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
                        
                                    message.channel.send(builder5).then(() => {
                                      message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                      .then(collected => {
                                          let content5l = collected.first().content.toLowerCase()
                                          let content5 = collected.first().content
                              
                                          if(content5l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
                              
                                          message.channel.send(builder6).then(() => {
                                            message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                            .then(collected => {
                                                let content6l = collected.first().content.toLowerCase()
                                                let content6 = collected.first().content
                                    
                                                if(content6l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
                                    
                                                message.channel.send(builder7).then(() => {
                                                  message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                                  .then(collected => {
                                                      let content7l = collected.first().content.toLowerCase()
                                                      let content7 = collected.first().content
                                          
                                                      if(content7l === 'end') return message.channel.send(`**Embed Builder Cancelled!**`).catch(e => {});
                                          
                                                      message.channel.send(finish1).catch(e => {});
                                                      embedBuilder(Hyperz, client, config, thechannel, message, content1, content2, content3, content4, content5, content6, content7)
                                                      setTimeout(() => {
                                                        message.channel.send(finish2)
                                                      }, 3000)
                                          
                                                  }).catch(e => {});
                                                }).catch(e => {});
                                    
                                            }).catch(e => {});
                                          }).catch(e => {});
                              
                                      }).catch(e => {});
                                    }).catch(e => {});
                        
                                }).catch(e => {});
                              }).catch(e => {});
                  
                          }).catch(e => {});
                        }).catch(e => {});
            
                    }).catch(e => {});
                  }).catch(e => {});
      
              }).catch(e => {});
            }).catch(e => {});

        }).catch(e => {});
      }).catch(e => {});

    } else {
		message.channel.send("You don't have permission to run this command...").then(msg => msg.delete({ timeout: 9000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);})
		message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
	}
}
}

async function embedBuilder(Hyperz, client, config, thechannel, message, content1, content2, content3, content4, content5, content6, content7) {

  var chan;

  try {
    chan = await client.channels.cache.get(thechannel)
  } catch(e) {
    console.log(e)
  }
    if(chan == undefined) return message.channel.send(`The channel provided was invalid...`);

    const finalizer = new Hyperz.MessageEmbed()

    if(content1 != 'na') {
      try { finalizer.setAuthor(content1) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding an author.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }
    if(content2 != 'na') {
      try { finalizer.setColor(content2) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding a color hex.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }
    if(content3 != 'na') {
      try { finalizer.setTitle(content3) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding a title.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }
    if(content4 != 'na') {
      try { finalizer.setThumbnail(content4) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding a thumbnail.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }
    if(content5 != 'na') {
      try { finalizer.setDescription(content5) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding a description.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }
    if(content6 != 'na') {
      try { finalizer.setImage(content6) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding an image.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }
    if(content7 != 'na') {
      try { finalizer.setFooter(content7) } catch(e) { if(e) return message.channel.send(`Something went *wrong* when adding a footer.`).then(msg => { msg.delete({ timeout: 12000 }), message.delete(), console.log(e); });}
    }

    try {
      await chan.send(finalizer).catch(e => { console.log(e) });
    } catch(e) {
      if(config.main_config.debugmode) return console.log(e)
    }

}

