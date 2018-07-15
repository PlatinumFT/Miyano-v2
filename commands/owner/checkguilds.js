var PastebinAPI = require('pastebin-js');

exports.run = async (client, message, args) => {
    let pastebin = new PastebinAPI({
        'api_dev_key' : client.settings.pastebin_key,
    });

    let str = ""
    client.guilds.forEach(e => {
        str+=`${e.name} - ${e.id}\n`;
    });

    if (str.length > 2048) {
        pastebin.createPaste(str, `**Guilds that I am currently in:** ${client.guilds.size}`)
        .then(function (data) {
            embed = new Discord.RichEmbed()
                .setAuthor(`**Guilds that I am currently in:** ${client.guilds.size}`)
                .setColor(role.color)
                .setDescription(`List of guilds can be found here: ${data}`)
                .setTimestamp();

            return message.channel.send(embed);
        })
    } else {
        return message.channel.send(`**Guilds that I am currently in:**\n${str}`)
    }
}

exports.help = {
    name: "checkguilds",
    description: "Checks the guilds that I am in.",
    usage: "checkguilds",
    type: "owner"    
}