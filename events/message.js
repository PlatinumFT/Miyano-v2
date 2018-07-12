const Discord = require("discord.js");

module.exports = async message => {

    if(message.author.bot) return;
    var client = message.client;
    var settings = client.settings;
    var prefix = settings.prefix;

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let command = messageArray[0];
    
    if(message.channel.type == 'dm') return;
    if(!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(command.slice(prefix.length)));

    if(!cmd) return;
    cmd.run(client, message, args);
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