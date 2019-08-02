const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send("❌ **I don't have permissions to kick!**");

    let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toBan) return message.channel.send("❌ **You did not specify a user!**")
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason specified";
    if(!toBan.id == message.author.id) return message.channel.send("❌ **You cannot kick yourself!**");
    if(toBan.highestRole.position >= message.member.highestRole.position) return message.channel.send('❌ **You cannot kick a member who has a higher or the same role as you!**')

    let serverMessage = `✅ **Kicked user ${toBan.user.username}#${toBan.user.discriminator}!**`
    let banMessage = `**__You have been kicked from ${message.guild.name}__**\n**Reason:** ${reason}`;
    

    try {
        await toBan.send(banMessage);
    } catch(e) {
        //
    }

    try {
        ban = await message.guild.member(toBan).kick({reason: reason});
        await message.channel.send(serverMessage);
    } catch(e) {
        await message.channel.send("❌ **I cannot kick this user!**");
    }
}
    
exports.help = {
    name: "kick",
    description: "Kicks the specified user. Option to add a reason.",
    usage: `kicked @Platinum#2109 kicked for spam.`,
    type: "moderation",
    aliases: [ 'k' ],
    permissions: 
    [
        'BAN_MEMBERS',
    ]
}
