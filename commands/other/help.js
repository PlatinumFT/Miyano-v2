const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    let help = args[0];

    let cmd = client.commands.get(help) || 
        client.commands.get(client.aliases.get(help));

        let embed = new Discord.RichEmbed()
            .setColor('#ffffff')
            .addField(`Help: ${cmd.help.name}`, `${cmd.help.description}`)
            .setFooter(`Usage: ${cmd.help.usage}`);

        return message.channel.send(embed);
}

exports.help = {
    name: "help",
    aliases: [
        'h'
    ]
}