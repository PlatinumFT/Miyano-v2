var Jimp = require("jimp");
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

    let toView = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.guild.member(message.author);
    let res = await client.db(`select * from users where user_id = '${toView.user.id}'`);
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
    // Loads the background
    Jimp.read('./images/test2.png').then(async function(image) {

        // Loads the avatar
        Jimp.read(toView.user.avatarURL).then(async function(avatar) {
            Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(function (font) {

                // Adds the avatar onto the current iamge
                avatar.resize(256, 256)
                image.composite(avatar, 20, 20);

                // Prints text
                image.print(font, 300, 20, `${toView.user.username}#${toView.user.discriminator}`);
                image.print(font, 300, 80, `XP: ${xp}`);
                image.print(font, 300, 140, `Rank: ${visualRank}`);

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
            })
        });
    }).catch(function(err) {
        if(err) console.log(err);
    })
}

exports.help = {
    name: "image",
    aliases: [
        'i'
    ]
}


  function onBuffer(err) {
    if (err) throw err;
  }