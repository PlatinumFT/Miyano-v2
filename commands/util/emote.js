const Discord = require("discord.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Please specify an emote!")
    var emotetext = args[0];
    var emoteRegex = /\:(\d.*?[0-9])\>/;
    var notid = emotetext.match(emoteRegex);
    if (!notid) return;
    var id = notid[1];

    var nameRegex = /\:(.*?)\:/;
    var emotenameresult = emotetext.match(nameRegex);
    if (!emotenameresult) return;
    var emotename = emotenameresult[1];

    let extension = "png";
    if(imageExists(id)) extension = "gif";

    message.channel.send(`**Emote:** :${emotename}:`, {
        file: `https://cdn.discordapp.com/emojis/${id}.${extension}`
    });
}

exports.help = {
    name: "emote",
    description: "Shows a full resolution image of a specified emote.",
    usage: "emote [emote name]",
    aliases: [ 'se', 'emoji' ],
    dmCommand: true
}


function imageExists(id){

    var http = new XMLHttpRequest();

    http.open('HEAD', `https://cdn.discordapp.com/emojis/${id}.gif`, false);
    http.send();
    return http.status == 200;
}