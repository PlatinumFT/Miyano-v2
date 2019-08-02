const Discord = module.require("discord.js");

module.exports.run = async (client, message, args, db) => {
    const query = client.db;    
    
    function embedFail(text) {
        let embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription(text);

    return embed
    }

    function embedSuccess(text) {
        let embed = new Discord.RichEmbed()
    .setColor("#7CFC00")
    .setDescription(text);

    return embed
    }

    let toCheck = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!toCheck) return message.channel.send("Please specify a user to check!");

    let res = await query(`select * from user_roles where guild_id = '${message.guild.id}' and user_id = '${toCheck.id}'`);
    if(!res[0]) return message.channel.send(embedFail(`This user does not have a role!`));

    let myRole = message.guild.roles.get(res[0].role_id);

    let embed = new Discord.RichEmbed()
    .setAuthor(`Current role assigned to ${toCheck.user.username}#${toCheck.user.discriminator}`, message.guild.iconURL)
    .setColor(myRole.hexColor)
    .addField(`Roles`, `${myRole.name}`, true)
    .addField(`Colour`,`${myRole.hexColor}`, true);

    await message.channel.send(embed);
}

exports.help = {
    name: "checkrole",
    description: "Checks a assigned user role.",
    usage: "checkrole",
}

