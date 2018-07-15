const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    let query = client.db
    let res = await query(`select * from xp WHERE guild_id='${message.guild.id}' ORDER by xp DESC`);
    let results;

    if (!args[0]) {
        results = 1;
    }

    if (args[0]) {
        results = args[0];
    }

    maxResults = results*10;
    minResults = maxResults-10;

    let text = "";
    let footerText = "";

    for(i=minResults;i<maxResults;i++){
        if(res[i]) {
        let isHere;
        let user = client.users.get(res[i].user_id);
        if(!user) isHere= "<User has left guild>"
        else isHere = `${user.username}#${user.discriminator}`;
        text+=`**[${i+1}]**     __**${isHere}**__\n                XP: ${res[i].xp}\n`;
        } 
    }
    for(i=0;i<(res.length);i++) {
        if(res[i].user_id === message.author.id) {
            footerText = `Your Rank:   ${i+1}     |    Your XP:   ${res[i].xp}`
        }
    }

    embed = new Discord.RichEmbed()
        .setAuthor(`XP Leaderboard for ${message.guild.name}`, message.guild.iconURL)
        .setDescription(text)
        .setColor(await client.findColour(message, client.user))
        .setFooter(footerText);

    message.channel.send(embed);
}

module.exports.help = {
    name: "xplb",
    description: "Shows the xp leaderboard for the guild.",
    usage: "xplb",
    type: "utility"    
}