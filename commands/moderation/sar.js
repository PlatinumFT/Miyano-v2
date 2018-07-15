const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
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


    if (!args[0]) return message.channel.send("Please specify a role to add!");
    let rolejoin = args.slice(0).join(' ');

    let myRole = message.guild.roles.find(val => val.name.toLowerCase() === rolejoin.toLowerCase());
    if(!myRole) return message.channel.send(embedFail('Role not found!'));
    if(myRole.managed) return message.channel.send(embedFail('I cannot assign this role to users!'));
    let botRole = message.guild.members.get(bot.user.id).highestRole;
    let userRole = message.guild.members.get(message.author.id).highestRole;
    
    let isPosition = botRole.comparePositionTo(myRole);
    if(isPosition <= 0) return message.channel.send(embedFail("This role is higher or equal to me, I cannot add this role!"));
    let isUserPosition = userRole.comparePositionTo(myRole);
    if(isUserPosition <= 0) return message.channel.send(embedFail("This role is higher or equal to you, you cannot add this role!"));

    let res = await query(`SELECT * FROM roles WHERE role_id='${myRole.id}';`);

    if(res[0]) {
        await query(`DELETE FROM roles WHERE role_id = '${myRole.id}'`);
        message.channel.send(embedSuccess(`Removed role ${myRole.name} from the list of assignable roles.`));
    } else if(!res[0]) {
        await query(`INSERT INTO roles (guild_id, role_id) VALUES ('${message.guild.id}','${myRole.id}')`);
        message.channel.send(embedSuccess(`Adding role ${myRole.name} to the list of assignable roles.`));
    }
}

module.exports.help = {
    name: "sar",
    description: "Sets a role as a self assignable role.",
    usage: "sar [role]",
    type: "roles",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}
