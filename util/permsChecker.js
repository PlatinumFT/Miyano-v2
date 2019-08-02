const Discord = require("discord.js");

module.exports = async (cmd, message) => {
    if(!cmd.help ||
       !cmd.help.permissions ||
       cmd.help.permissions == []
    ) return true;

    if (message.author.id == message.client.settings.owner_id) return true;
    let mem = await message.guild.members.get(message.author.id);
    for(i=0; i<cmd.help.permissions.length; i++) {
        if (!mem.hasPermission(cmd.help.permissions[i])) {
            await message.channel.send(embed(`You do not have the **${cmd.help.permissions[i]}** permission!`));
            return false;
        }
    }
    return true;
}

function embed(text) {
    let r = new Discord.RichEmbed().setColor('ff0000').setDescription(text);
    return r;
}
