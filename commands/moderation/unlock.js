exports.run = async (client, message, args) => {
    if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have the correct permissions to lockdown!");
    let channel = message.channel;

    if (args[0]) {
        if (message.guild.channels.get(args[0].replace(/\D/g, '')) === undefined) return message.channel.send("❌ I cannot find this channel!");
        channel = message.guild.channels.get(args[0].replace(/\D/g, ''));
    }

    await channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    }).then(async function () {
        await message.channel.send(`✅ Unlocked <#${channel.id}>`);
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