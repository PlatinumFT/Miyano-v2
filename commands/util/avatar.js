const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {

    let msg = await message.channel.send("Generating avatar...")
    let target;
    
    let text = args.slice(0).join(' ');

    target = await client.findUser(message, text);    
    if(!target) return message.channel.send("not found");

    await message.channel.send(new Discord.RichEmbed()
                                .setImage(target.avatarURL)
                                .setColor(await client.findColour(message, client.user))
                              );
    
    await msg.delete();
}

exports.help = {
    name: "avatar",
    description: "Checks avatar",
    usage: "avatar @Platinum",
    dmCommand: true,
    aliases: [ 'av' ]
}