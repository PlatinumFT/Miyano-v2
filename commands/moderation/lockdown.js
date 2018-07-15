exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("I don't have the correct permissions to lockdown!");

    let m = await message.channel.send("Locking channel...");
    await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }).then(async function() {
	await m.edit("Channel locked.");
    }).catch(async function(e) {
	await m.edit("Failed to lock channel.");
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

