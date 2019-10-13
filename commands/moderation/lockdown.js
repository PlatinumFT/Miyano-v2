exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("❌ I don't have the correct permissions to lockdown!");
    let channel = message.channel;

    if(args[0]) {
        if(message.guild.channels.get(args[0].replace(/\D/g, '')) === undefined) return message.channel.send("❌ I cannot find this channel!");
        channel = message.guild.channels.get(args[0].replace(/\D/g, ''));
    }

    let m = await message.channel.send("Locking channel...");
    await channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }).then(async function() {
	    await m.edit(`✅ locked channel ${channel}`);
    }).catch(async function(e) {
	    await m.edit("❌ Failed to lock channel.");
    });
}

exports.help = {
    name: "lockdown",
    description: "Locks the current channel so that nobody can send messages.",
    usage: "lockdown",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}

