const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.channel.send("I don't have permissions to kick!");

    let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason specified";
    if(!toBan) return message.channel.send("You did not specify a user!")
    if(!toBan.id == message.author.id) return message.channel.send("You cannot kick yourself!");
    if(toBan.highestRole.position >= message.member.highestRole.position) return message.channel.send('You cannot kick a member who has a higher or the same role as you!')

    let embed = new Discord.RichEmbed()
    .setAuthor(`Kicked user`)
    .addField(`Name`, `${toBan.user.username}`, true)
    .addField('ID', `${toBan.id}`, true)
    .setColor("#FF0000")

    let banEmbed = new Discord.RichEmbed()
    .setAuthor(`You have been kicked from ${message.guild.name}`)
    .setColor("#FF0000")
    .setDescription(`Reason: ${reason}`)
    .setTimestamp();

    try {
        await toBan.send(banEmbed)
    } catch(e) {
        embed.setFooter(`No DM sent.`);
    }

    try {
        ban = await message.guild.member(toBan).kick({reason: reason});
        await message.channel.send(embed);
    } catch(e) {
        await message.channel.send("I cannot ban this user!");
    }
}

exports.help = {
    name: "kick",
    description: "Kicks the specified user. Option to add a reason.",
    usage: `kick @Platinum#2109 kicked for NSFW outside of designated channel`,
    aliases: [ 'k' ],
    permissions: 
    [
        'KICK_MEMBERS',
    ]
}