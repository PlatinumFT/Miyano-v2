const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have permissions to ban!");

    let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason specified";
    if(!toBan) return message.channel.send("You did not specify a user!")
    if(!toBan.id == message.author.id) return message.channel.send("You cannot ban yourself!");
    if(toBan.highestRole.position >= message.member.highestRole.position) return message.channel.send('You cannot ban a member who has a higher or the same role as you!')

    let embed = new Discord.RichEmbed()
    .setAuthor(`Banned user`)
    .addField(`Name`, `${toBan.user.username}`, true)
    .addField('ID', `${toBan.id}`, true)
    .setColor("#FF0000")

    let banEmbed = new Discord.RichEmbed()
    .setAuthor(`You have been banned from ${message.guild.name}`)
    .setColor("#FF0000")
    .setDescription(`Reason: ${reason}`)
    .setTimestamp();

    try {
        await toBan.send(banEmbed)
    } catch(e) {
        embed.setFooter(`No DM sent.`);
    }

    try {
        ban = await message.guild.member(toBan).ban({ days: 7, reason: reason});
        await message.channel.send(embed);
    } catch(e) {
        await message.channel.send("I cannot ban this user!");
    }
}
    
exports.help = {
    name: "ban",
    description: "Bans the specified user. Option to add a reason.",
    usage: `ban @Platinum#2109 banned for advertising`,
    type: "moderation",
    aliases: [ 'b' ],
    permissions: 
    [
        'BAN_MEMBERS',
    ]
}