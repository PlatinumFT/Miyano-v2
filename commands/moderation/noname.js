let discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!args[0]) return await message.channel.send(`Please select a nickname!`)
    let text = args.join(' ');
    let users = await message.guild.members.filter(m => !isLetter(m.displayName.charAt(0)));

    let failed=0,
        success=0;

    if(users.size == 0) return await message.channel.send(`**There are no users to rename!**`);

    let clientUser = await message.guild.members.get(client.user.id);

    await message.channel.send(`⏳ Renaming **${users.size}** users...`);
    await users.forEach(async (u) => {
        if(u.highestRole.position >= clientUser.highestRole.position) {
            failed+=1;
            checkNumber(success+failed, users.size)
        } else {
            await u.setNickname(text, `${message.author.username} rename.`);
            success+=1;
            checkNumber(success+failed, users.size)
        }
    });

    function checkNumber(first, second) {
        if(first == second) {
            return message.channel.send(`Finished renaming!\n✅ - ${success}\n❌ - ${failed}`);
        }
    }

}

exports.help = {
    name: "noname",
    description: "Renames anybody without a valid character name",
    usage: "noname [NAME]",
    permissions: 
    [
        'MANAGE_NICKNAMES'
    ]
}

function isLetter(str) {
    var letters = /^[A-Za-z]+$/;
   return(str.match(letters))
}


