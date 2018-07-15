var Jimp = require("jimp");
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

    let toView = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.guild.member(message.author);
    
    let res = await client.db(`select * from users where user_id = '${toView.user.id}'`);
    let background = res[0].background_id || 0;
    
    let rank = await client.db('select * from users ORDER by xp desc');
    let xp;

    if(res[0]) xp = res[0].xp;
    else xp = '0';

    let visualRank = 0;
    for(i=0;i<(rank.length);i++) {
        if(rank[i].user_id === toView.user.id) {
            visualRank = i+1;
        }
    }

    level = Math.pow(xp/280, 1/1.7);

    percent = (xp/nextLevel(level+1))/100;

    // Loads the background
    Jimp.read(`./images/backgrounds/bg_${background}.png`).then(async function(image) {

        // Loads the overlay
        Jimp.read(`./images/overlay.png`).then(async function(overlay) {

        // Loads the avatar
        Jimp.read(toView.user.avatarURL).then(async function(avatar) {


            Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {
                Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function (fontBIG) {
                Jimp.loadFont(Jimp.FONT_SANS_8_WHITE).then(function (font2) {
                        // Adds the avatar onto the current iamge
                    avatar.resize(74, 74)
                    image.composite(overlay, 0, 0);
                    image.composite(avatar, 19, 22);

                    // Prints text
                    image.print(font, 140, 50, 'Profile card for:')
                    image.print(font, 140, 80, `${toView.user.username}#${toView.user.discriminator}`);
                    image.print(font, 25, 160, `Level: ${parseInt(level)}`);
                    image.print(font, 25, 190, `XP: ${xp}/${nextLevel(parseInt(level+1))}`);
                    image.print(font, 25, 130, `Rank: ${visualRank}`);  
                    image.print(font, 150, 130, `Money:`);
                    image.print(font, 168, 160, `Rep:`);

                    // Creates the file
                    let outputFile = './images/' + Math.random().toString(36).substr(2, 5) + "test." + image.getExtension();
                    
                    // Writes the file and sends the message
                    image.write(outputFile, function() {
                        message.channel.send({file: outputFile}).then(function() {

                            // Deletes the file
                            fs.unlink(outputFile, function(err) {
                                console.error(err);
                            });
                        })
                    });
                });
                });
            });
            });
        });
    }).catch(function(err) {
        if(err) console.log(err);
    })
}

exports.help = {
    name: "profile",
    aliases: [
        'prof'
    ]
}


  function onBuffer(err) {
    if (err) throw err;
  }

  function nextLevel(level) {
    exponent = 1.7;
    baseXP = 280;
    return Math.floor(baseXP * (Math.pow(level, exponent)));
}