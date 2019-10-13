const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the correct permissions to alter filters!");

    if(args[0] == "add") {
        let text = args.slice(1).join(' '),
            textSQL = text.replaceAll("'", "''");
        await client.db(`insert into filter values('${message.guild.id}','${textSQL}')`);
        await message.channel.send(`Added ${text} to list of filtered words/phrases.`);
    }

    if(args[0] == "remove") {
        let text = args.slice(1).join(' ');
        let textSQL = text.replaceAll("'", "''");
        await client.db(`delete from filter where guild_id = '${message.guild.id}' and phrase = '${textSQL}'`);
        await message.channel.send(`Removed ${text} from list of filtered words/phrases.`);
    }

    if(!args[0]) {
        let res = await client.db(`select * from filter where guild_id = '${message.guild.id}'`);
        let text = "";
        if(!res[0]) {
            text = "There are no filtered words.";
        } else {
            for(i=0;i<res.length;i++) {
                text+=res[i].phrase + '\n';
            }
        }

        await message.channel.send(await warnedEmbed(message, text))
    }
}

exports.help = {
    name: "filter",
    description: "",
    usage: "filter add/remove [text]",
    permissions: 
    [
        'MANAGE_ROLES', 'MANAGE_MESSAGES'
    ]
}

async function warnedEmbed(message, text) {
    let embed = new Discord.RichEmbed()
                .setAuthor(`List of filtered words for ${message.guild.name}`, message.guild.iconURL)
                .setColor(await message.client.findColour(message, message.client.user))
                .setDescription(text)
    return embed;
}

String.prototype.replaceAll = function(search, replace)
{
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};