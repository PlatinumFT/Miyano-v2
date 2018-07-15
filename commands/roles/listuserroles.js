const Discord = module.require("discord.js");

module.exports.run = async (client, message, args, db) => {
    const query = client.db;
    
    let res = await query(`SELECT * FROM user_roles WHERE guild_id = '${message.guild.id}'`);
    let assignNames = "";

        var numbRoles = res.length;
        if (res.length == 0) assignNames = "There are no user assignable roles."
        for (i = 0; i < numbRoles; i++) {
            let myRole = message.guild.roles.find("id", res[i].role_id);
            let myUser = message.guild.members.find("id", res[i].user_id);
            if(!myRole || !myUser) {
                await query(`DELETE FROM user_roles where guild_id = '${message.guild.id}' AND role_id = '${res[i].role_id}' and user_id = '${res[i].user_id}'`);
                return;
            }
            assignNames+=`${myUser.user.username}#${myUser.user.discriminator} - ${myRole.name}\n`;
        }

        let guildMem = message.guild.members.get(client.user.id);

        let embed = new Discord.RichEmbed()
        .setAuthor(`List of assigned roles for ${message.guild.name} - ${res.length}`, message.guild.iconURL)
        .setColor(guildMem.displayColor)
        .addField(`Roles`, `${assignNames}`)

        message.channel.send(embed);    
}

module.exports.help = {
    name: "listuserroles",
    description: "Lists self assignable roles.",
    usage: `listuserroles`,
    type: "roles"    
}