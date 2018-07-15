const Discord = module.require("discord.js");
var PastebinAPI = require('pastebin-js');


exports.run = async (client, message, args) => {
    let pastebin = new PastebinAPI({
        'api_dev_key' : client.settings.pastebin_key,
    });
    

    let text = args.slice(0).join(' ');

    let role = message.guild.roles.find(val => val.name.toLowerCase() === text.toLowerCase());
    if(!role) message.channel.send('I cannot find this role!');   
    let str = '';
    let count=0;

    if (role.members.length > 20) {
        pastebin.createPaste()
    }


    role.members.forEach(function(e) {
        str+=`${e.user.username}#${e.user.discriminator}\n`;
        count+=1;
    });

    if (str.length > 2048) {
        pastebin.createPaste(str, `List of users in role ${role.name} - ${count}`)
        .then(function (data) {
            embed = new Discord.RichEmbed()
                .setAuthor(`List of users in role '${role.name}' - ${count}`)
                .setColor(role.color)
                .setDescription(`List of users can be found here: ${data}`)
                .setTimestamp();

        return message.channel.send(embed);
        })
        .fail(function (err) {
            embed = new Discord.RichEmbed()
            .setAuthor(`There are ${count} in role '${role.name}'`)
            .setColor(role.color)
            .setTimestamp();

    return message.channel.send(embed);
        })
    } else {
        embed = new Discord.RichEmbed()
            .setAuthor(`List of users in role '${role.name}' - ${count}`)
            .setColor(role.color)
            .setDescription(str)
            .setTimestamp();

        return message.channel.send(embed)
    }
}

exports.help = {
    name: "inrole",
    description: "Checks the users in a role.",
    usage: "inrole",
    type: "help"    
}