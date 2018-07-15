const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    let target;
    let text = args.slice(0).join(' ');

    target = await client.findUser(message, text);
    if(!target) return message.channel.send("No user found!");
    
    let roles = "";
    let count = 0;        
    let guildMem = message.guild.members.get(target.id);
    if(!guildMem) return message.channel.send(`User is not in this guild.`);
    if(!guildMem.nickname) nickname = "None"
    else nickname = guildMem.nickname;

    let embed = new Discord.RichEmbed()
        .setAuthor(`User info for ${target.username}`, target.displayAvatarURL)
        .setColor(await client.findColour(message, target))
        .setThumbnail(target.displayAvatarURL)
        .addField("Full Username", `${target.username}#${target.discriminator}`, true)
        .addField("ID", `${target.id}`, true)
        .addField("Nickname", `${nickname}`, true)
        .addField("Status", `${guildMem.presence.status}`, true)            
        .addField("Created At", moment(target.createdAt).format('MMMM Do YYYY, h:mm:ssa'))
        .addField("Joined", moment(guildMem.joinedAt).format('MMMM Do YYYY, h:mm:ssa'))
        .addField(`Roles - ${guildMem.roles.size}`, guildMem.roles.map(m => m.name).join(', '))
        .setTimestamp();

    if(target.presence.game)
        embed.setDescription(`Playing **${target.presence.game.name}**`)

    message.channel.send(embed);

    return;

}

module.exports.help = {
    name: "userinfo",
    description: "Shows the userinfo for a user.",
    usage: "userinfo @Platinum",
    type: "fun"    
}