const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    let text = args.slice(0).join(' '),
        target = await client.findUser(message, text),

    if (!target) return message.channel.send("Not found");

    await message.channel.send(new Discord.RichEmbed()
        .setImage(target.avatarURL)
        .setColor(await client.findColour(message, client.user))
    );
}

exports.help = {
    name: "avatar",
    description: "Checks avatar",
    usage: "avatar @Platinum",
    dmCommand: true,
    aliases: ['av']
}