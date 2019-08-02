const Discord = module.require("discord.js");

module.exports.run = async (client, message, args, db) => {
    const query = client.db;   
    let res = await query(`SELECT * FROM user_roles WHERE guild_id = '${message.guild.id}'`);

    if (res.length == 0) assignNames = "There are no user assignable roles."

    let page = 1;
    if(args[0]) page = args[0];

    await sendPageMessage(page);

    async function sendPageMessage(page) {   
        let guildMem = await message.guild.members.get(client.user.id);

        let str = await getString(page);
        if(str == '') return;
    
        let embed = new Discord.RichEmbed()
        .setAuthor(`List of assigned roles for ${message.guild.name} - ${res.length}`, message.guild.iconURL)
        .setColor(guildMem.displayColor)
        .addField(`Roles`, str);
    
        let msg = await message.channel.send(embed);
        return msg;
    }

    async function getString(page) {
        maxResults = page*10;
        minResults = maxResults-10;
        let assignNames = '';
        
        for (i = minResults; i < maxResults; i++) {
            if(i<res.length) {
                let myRole = message.guild.roles.get(res[i].role_id);
                let myUser = message.guild.members.get(res[i].user_id);
                if(!myRole || !myUser) {
                    await query(`DELETE FROM user_roles where guild_id = '${message.guild.id}' AND role_id = '${res[i].role_id}' and user_id = '${res[i].user_id}'`);
                } else {
                    assignNames+=`${myUser.user.username}#${myUser.user.discriminator} - ${myRole.name}\n`;
                }
            }
        }

        return assignNames;
    }
}

module.exports.help = {
    name: "listuserroles",
    description: "Lists self assignable roles.",
    usage: `listuserroles`,
    type: "roles"    
}
