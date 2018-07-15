const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have permissions to unban!");
    if(args.length == 0) return message.channel.send("Please supply an ID!");
    
    let embed = new Discord.RichEmbed()
        .setAuthor(`Unbanned user`)
        .setDescription(`ID: ${args[0]}`)
        .setColor('#FFFF00')
        .setTimestamp();

    try {
        await message.guild.unban(args[0]);
        return await message.channel.send(embed);
    } catch(e) {
        return await message.channel.send(`I cannot unban this user!`);
    }

    }
    
exports.help = {
    name: "unban",
    description: "Unbans the specified user.",
    usage: `unban 166995790416314370`,
    aliases: [ 'ub' ],
    permissions:
    [
        'BAN_MEMBERS'
    ]
}