const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("You don't have the correct permissions to clear a warning!");

    if(!args[0]) return message.channel.send("You did not specify an ID!");
    await client.db(`DELETE FROM WARNINGS WHERE guild_id = '${message.guild.id}' AND id = ${args[0]}`)
    message.channel.send(`**Case ${args[0]} has been cleared.**`);
}

module.exports.help = {
    name: "clearwarn",
    description: "",
    usage: "clearwarn <id>",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}