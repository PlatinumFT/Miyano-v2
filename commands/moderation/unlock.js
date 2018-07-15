exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("I don't have the correct permissions to lockdown!");

    await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    }).then(async function() {
	await message.channel.send("Unlocked channel.");
    }).catch(e => {
	console.log(`Cannot unlock channel: ${message.channel.name}`);
    });
}

exports.help = {
    name: "unlock",
    description: "Unlocks the current channel.",
    usage: "unlock",
    type: "moderation",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}