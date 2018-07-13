exports.run = async (client, message, args) => {
    let toBab = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toBab) return message.channel.send('Enter a valid user!');

    return message.channel.send(`bitch u got babbed !!!!!!!!!!!!!!! ${toBab}. ${client.emojis.get("467087005461905428")}`)
}

exports.help = {
    name: "bab",
    description: "Babs the user",
    usage: "bab <user>",
}