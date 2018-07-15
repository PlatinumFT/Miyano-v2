const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    const query = bot.db;    
    
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


    let res = await query(`SELECT * FROM user_roles WHERE guild_id = '${message.guild.id}' AND user_id = '${message.author.id}'`)

        if(!args[0]) {

        if(!res[0]) return message.channel.send(embedFail("You do not have a role!"));

        let myRole = message.guild.roles.get(res[0].role_id);

        let assignNames = "";
        let embed = new Discord.RichEmbed()
        .setAuthor(`Current role assigned to ${message.author.username}`, message.guild.iconURL)
        .setColor(myRole.hexColor)
        .addField(`Roles`, `${myRole.name}`, true)
        .addField(`Colour`,`${myRole.hexColor}`, true);

        message.channel.send(embed);
        }
        else {

            if(!res[0]) return message.channel.send(embedFail("You do not have a role!"));

            let myRole = message.guild.roles.get(res[0].role_id);

            hexCode = args[0];
            myRole.setColor(hexCode);
            return message.channel.send(embedSuccess(`You have changed ${myRole.name}'s color from ${myRole.hexColor} to #${hexCode}!`));
        }
}

module.exports.help = {
    name: "myrole",
    description: "Checks your assigned user role. Add a hexcode to change the colour.",
    usage: "myrole FF0000",
    type: "roles"    
}
