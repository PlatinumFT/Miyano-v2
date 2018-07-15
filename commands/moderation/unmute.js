let Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!user) return message.channel.send(`Please specify a valid user or ID!`);
    if(user.highestRole.position >= message.member.highestRole.position) return message.channel.send('You cannot unmute a member who has a higher or the same role as you!')

    let role = message.guild.roles.find(r => r.name == 'Tsukihi Mute');

    if(!role || !user.roles.has(role.id)) return message.channel.send(embedFail(`**${user}** is not muted.`));

    await user.removeRole(role);
    await message.channel.send(embedSuccess(`Successfully unmuted ${user}.`));
}


exports.help = {
    name: "unmute",
    description: "Unmutes the user if they're muted.",
    usage: "unmute @Platinum#0001",
    permissions: 
    [
        'MANAGE_MESSAGES', 'MUTE_MEMBERS'
    ]
}

function embedFail(text) {
    let embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setDescription(text);

    return embed;
}

function embedSuccess(text) {
    let embed = new Discord.RichEmbed()
        .setColor("#7CFC00")
        .setDescription(text);

    return embed;
}