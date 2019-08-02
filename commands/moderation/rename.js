let discord = require('discord.js');

exports.run = async (client, message, args) => {
    let toRename = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toRename) return message.channel.send("❌ **You did not specify a user!**")
    let text = args.slice(1).join(' ');
    if(!text) return await message.channel.send('❌ Please specify a nickname!')
    if(toRename.highestRole.position >= message.member.highestRole.position) return message.channel.send('❌ **You cannot change the nickname of a member who has a higher or the same role as you!**')

    await toRename.setNickname(text, `${message.author.username} rename.`);

    await message.channel.send(`✅ **Updated nickname for user ${toRename.user.username}#${toRename.user.discriminator}!**`);
}

exports.help = {
    name: "rename",
    description: "Renames specified user",
    usage: "rename <user> [NAME]",
    permissions: 
    [
        'MANAGE_NICKNAMES'
    ]
}
