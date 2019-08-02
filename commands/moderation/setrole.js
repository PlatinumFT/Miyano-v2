const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    const query = client.db;    
    
    function embedFail(text) {
    let embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setDescription(text);

    return embed
    }

    function embedSuccess(text) {
    let embed = new Discord.RichEmbed()
        .setColor("#7CFC00")
        .setDescription(text);

    return embed
    }

    if (!args[0]) return message.channel.send("Please specify a user!");
    let toAdd = message.guild.members.get(args[0]) || message.guild.members.get(message.mentions.users.first().id);

    let rolejoin = args.slice(1).join(' ');
    let myRole = message.guild.roles.find(val => val.name.toLowerCase() === rolejoin.toLowerCase());
    if (!myRole) return message.channel.send('I cannot find this role!');

    if (!toAdd) return message.channel.send("User not found!");
    if (!rolejoin) return message.channel.send("Please specify a role to add!");    

    let clientRole = message.guild.members.get(client.user.id).highestRole;
    let userRole = message.guild.members.get(message.author.id).highestRole;

    if(clientRole.comparePositionTo(myRole) <= 0) return message.channel.send(embedFail("This role is higher than me, I cannot add this role!"));
    if(userRole.comparePositionTo(myRole) <= 0) return message.channel.send(embedFail("This role is higher than you, I cannot add this role!"));

    toAdd.addRole(myRole)
    return await message.channel.send(embedSuccess(`Added role ${myRole.name} to ${toAdd.user.username}#${toAdd.user.discriminator}.`));
}

module.exports.help = {
    name: "setrole",
    description: "Adds a role to a user.",
    usage: "setrole @Platinum [role]",
    permissions: 
    [
        'MANAGE_ROLES',
    ],
    aliases:
    [
        'sr'
    ]
}
