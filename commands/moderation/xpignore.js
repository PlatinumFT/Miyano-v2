const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    let query = client.db;
    let res;
    if(!args[0]) args[0] = 'check';
    switch(args[0].toLowerCase()) {
        case 'check':
            res = await query(`SELECT * from ignorexp WHERE(guild_id = '${message.guild.id}')`);
            if(!res[0]) return message.channel.send(`There are no channels that have xp disabled!`);
            let str="";
            res.forEach(e => {
                let c = message.guild.channels.get(e.channel_id);
                str+=c.name+'\n';
            })
            message.channel.send(`Current channels that have xp disabled: \n${str}`)
            break;
        case 'disable':
            res = await query(`SELECT * from ignorexp WHERE(guild_id = '${message.guild.id}' AND channel_id = '${message.channel.id}')`);
            if(res[0]) return message.channel.send(`XP is already disabled here!`);
            
            await query(`INSERT INTO ignorexp(guild_id,channel_id) VALUES ('${message.guild.id}','${message.channel.id}')`);
            await message.channel.send(`XP is no longer being gained in channel: **${message.channel.name}**`);
            
            break;
        case 'enable':
            res = await query(`SELECT * from ignorexp WHERE(guild_id = '${message.guild.id}' AND channel_id = '${message.channel.id}')`);
            if(!res[0]) return message.channel.send(`XP is already enabled here!`);
            
            await query(`DELETE FROM ignorexp WHERE(guild_id = '${message.guild.id}' AND channel_id = '${message.channel.id}')`);
            await message.channel.send(`XP is now being gained in channel: **${message.channel.name}**`);
            
            break;
    }
}

module.exports.help = {
    name: "xpignore",
    description: "Ignores a channel from gaining xp.",
    usage: "xpignore ENABLE/DISABLE",
    permissions: 
    [
        'MANAGE_ROLES',
    ]
}
