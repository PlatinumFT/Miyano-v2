const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {

    let help = args[0];
    if (!help) {
        let cmds = new Map();
        let embed = new Discord.RichEmbed()
            .setAuthor(`List of commands for ${client.user.username}`, client.user.avatarURL)
            .setColor('#ff0000')      
            .setFooter(`Use help [command] for more info on each command.`);

        client.commands.forEach(k =>
        {
            if(!k.help.type || k.help.type == '') return;
            if(!cmds.has(k.help.type)) cmds.set(k.help.type, [])
            cmds.get(k.help.type).push(k.help.name);
        });

        let keys = Array.from(cmds.keys());
        keys.sort()

        keys.forEach(e => {
            commands = cmds.get(e);
            embed.addField(e.capitalize(), commands.join(', '));
        })

        return message.channel.send(embed);
    } else {
    
        let cmd = client.commands.get(args[0]);

        let embed = new Discord.RichEmbed()
            .setColor('#ffff00')
            .addField(`Help: ${cmd.help.name}`, `${cmd.help.description}`)
            .setFooter(`Usage: ${cmd.help.usage}`);

        return message.channel.send(embed);
    };
};

exports.help = {
    name: "help",
    type: "help",
    aliases: ['h']
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}