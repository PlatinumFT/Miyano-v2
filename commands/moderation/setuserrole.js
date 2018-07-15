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

    if (!args[0]) return message.channel.send("Please specify a user to add!");
    let toAdd = message.guild.members.get(args[0]) || message.guild.members.get(message.mentions.users.first().id);

    let rolejoin = args.slice(1).join(' ');
    let myRole = message.guild.roles.find(val => val.name.toLowerCase() === rolejoin.toLowerCase());

    if (!toAdd) return message.channel.send("User not found!");
    if (!rolejoin) return message.channel.send("Please specify a role to add!");    

    let botRole = message.guild.members.get(bot.user.id).highestRole;
    
    let isPosition = botRole.comparePositionTo(myRole);
    if(isPosition <= 0) return message.channel.send(embedFail("This role is higher than me, I cannot add this role!"));

        let res = await query(`SELECT * FROM user_roles WHERE role_id='${myRole.id}'`);
        if(res[0]) {
            await query(`DELETE FROM user_roles where role_id='${myRole.id}'`)
            message.channel.send(embedSuccess(`Removed role ${myRole.name} from ${toAdd.user.username}`));
        } else if(!res[0]) {
            await query(`INSERT INTO user_roles (guild_id, user_id, role_id) VALUES ('${message.guild.id}',${toAdd.id},'${myRole.id}')`)
            message.channel.send(embedSuccess(`Adding role ${myRole.name} to ${toAdd.user.username}`));
        }
}

module.exports.help = {
    name: "setuserrole",
    description: "Assigns a role to a user.",
    usage: "setuserrole @Platinum [role]",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}