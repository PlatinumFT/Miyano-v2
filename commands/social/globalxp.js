const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    let text = args.slice(0).join(' ');
    const query = client.db;
    let xp;
        if(!text) target = message.author;
    
        target = await client.findUser(message, text);
        if(!target) return message.channel.send("User not found!");

        let res = await query(`SELECT * FROM globalxp WHERE (user_id = '${target.id}')`);
        if (!res[0]) {
            xp = 0;
        } else {
            xp = res[0].xp;
        }

        let embed = new Discord.RichEmbed()
        .setAuthor(`Current xp for ${target.username}#${target.discriminator}`, target.displayAvatarURL)
        .setDescription(`${target.username} currently has ${xp} XP.`)
        .setColor(await client.findColour(message, client.user));

        message.channel.send(embed);
}

module.exports.help = {
    name: "globalxp",
    description: "Shows your global xp.",
    usage: "xp",
    type: "utility"    
}