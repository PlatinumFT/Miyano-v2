const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
       if(!args[0]) return message.channel.send("You did not specify a user!");
    target = message.mentions.users.first() || client.users.get(args[0]);
    if(!target) return message.channel.send("User not found!");
    let res = await client.db(`select * from warnings where guild_id = '${message.guild.id}' ORDER BY id desc`);
    let date = new Date().toUTCString()

    if(args[1]) reason = args.slice(1).join(' ');
    else reason = `No reason specified.`
    let reasonSQL = reason.replaceAll("'", "''")
    let numb = 0;

    if(res[0]) numb = parseInt(res[0].id);
    await client.db(`INSERT INTO WARNINGS VALUES ('${message.guild.id}',${numb+1}, '${target.id}','${reasonSQL}', '${date}', '${message.author.id}')`)
    target.send(await warnedEmbed(message, reason)).catch(e => console.error);
    message.channel.send(`User **${target.username}#${target.discriminator} has been warned.**`);
}

module.exports.help = {
    name: "warn",
    description: "",
    usage: "warn <user> [reason]",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}


async function warnedEmbed(message, reason) {
    let embed = new Discord.RichEmbed()
                .setAuthor(`You have been warned in ${message.guild.name}`, message.guild.iconURL)
                .setColor('FF0000')
                .setDescription(`Reason: ${reason}`)
                .setTimestamp();
    return embed;
}

String.prototype.replaceAll = function(search, replace)
{
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};