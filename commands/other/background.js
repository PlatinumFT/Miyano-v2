const Discord = require('discord.js');
var fs = require('fs');

exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send('Please specify a background ID between 0 and 3!');

    if (!fs.existsSync(`./images/backgrounds/bg_${args[0]}.png`)) return message.channel.send("This background doesn't exist!");

    await client.db(`update users set background_id = ${parseInt(args[0])} where user_id = '${message.author.id}'`);
    message.channel.send(`Updated background to background: ${args[0]}`)
}

exports.help = {
    name: "background",
    description: 'Sets your profile background',
    usage: 'background 0-3',
    aliases: [
        'bg'
    ]
}