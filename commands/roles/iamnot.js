const Discord = module.require("discord.js");

exports.run = async (bot, message, args, db) => {
    const query = bot.db;    
    let toAdd = message.author;
    let rolejoin = args.slice(0).join(' ');

    function embedFail(text) {
    let embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setDescription(text);

    return embed
    }

    function embedSuccess(text) {
    let embed = new Discord.RichEmbed()
        .setColor("#FFFF00")
        .setDescription(text);

    return embed
    }

    if (!args[0]) return message.channel.send(embedFail("Please specify a role to unassign yourself!"));    
    
    let myRole = message.guild.roles.find(val => val.name.toLowerCase() === rolejoin.toLowerCase());;
    if(!myRole) return message.channel.send(embedFail("This role does not exist!"));
    let res = await query(`SELECT * FROM roles WHERE role_id='${myRole.id}'`);
    if(!res[0]) {
        message.channel.send(embedFail("This is not an assignable role!"))
        return;
    } else if(res[0]) {
        if(!message.member.roles.has(myRole.id)) return message.channel.send(embedFail("You do not have this role!"));                            
        try {
            message.guild.member(toAdd).removeRole(myRole, "Self assigned role.");
            message.channel.send(embedSuccess(`${message.author.username}, you no longer have the ${myRole.name} role.`));
        } catch(e) {
            console.log(e.stack);
        }
    }
}

exports.help = {
    name: "iamnot",
    description: "Removes a self assigned role.",
    usage: `iamnot NSFW`,
    type: "roles",
    aliases: [ 'iamn' ]
}

var messageTimers = {
    userid: {
        time: new Date()
    }
}