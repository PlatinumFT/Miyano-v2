const Discord = require("discord.js");
const moment = require('moment');

module.exports = async message => {

    if(message.author.bot) return;
    var client = message.client;
    var settings = client.settings;
    var prefix = settings.prefix;
    var prefix2 = null;
    var query = client.db;
    
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let command = messageArray[0];
    let isOwner = false;
    if(settings.owner_id == message.author.id) isOwner = true;
    
    if(message.channel.type == 'dm') {
        await dmOwner(message);
        let cmd = client.commands.get(command.slice(prefix.length)) ||
        client.commands.get(client.aliases.get(command.slice(prefix.length)));

        if(cmd.help.dmCommand) cmd.run(client, message, args);
    }
    else {
        if(!command.startsWith(prefix)) {
            var res = await query(`SELECT * FROM guilds where guild_id='${message.guild.id}'`);
            if(res[0]) prefix = res[0].prefix;
        }
        
        require('../util/filter.js')(message, message.content);
        require('../util/xpHandler.js')(message);
    
        if(!command.startsWith(prefix)) return;
    
        let cmd = client.commands.get(command.slice(prefix.length)) ||
        client.commands.get(client.aliases.get(command.slice(prefix.length)));
    
        if(!cmd) return;
    
        if ((cmd.help.type == "owner" && !isOwner)) return;
        let bool = await require('../util/permsChecker.js')(cmd, message);
        if(bool) {
            cmd.run(client, message, args)
        };
    }
};

function dmOwner(message) { 
    const client = message.client;
    let c = client.users.get(client.settings.owner_id);

    if (message.author.id == client.settings.owner_id) return;

    let embed = new Discord.RichEmbed()
        .setAuthor(`Message recieved from ${message.author.username}`, message.author.displayAvatarURL)
        .setColor('#FFFFFF')
        .setDescription(`Content: ${message.content}`)
        .setTimestamp()
        .setFooter(`${message.author.id}`);

    return c.send(embed);
}