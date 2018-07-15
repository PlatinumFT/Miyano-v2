const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have permissions to ban!");
    if(args.length == 0) return message.channel.send("Please supply an ID!");
    
    var success=0;
    var failure=0;

    for(i=0;i<args.length;i++) {
        try {
            if(args[i].id == message.author.id) failure+=1;
            else {
                ban = await message.guild.ban(args[i]);
                success+=1;
            }
        } catch(e) {
            failure+=1
        }
    }

    let char = message.guild.members.get(client.user.id);

    let embed = new Discord.RichEmbed()
        .setAuthor(`Hackbanning ${args.length} users`)
        .addField('Banned',success.toString(),true)
        .addField('Failed',failure.toString(),true)
        .setColor(char.displayColor)
        .setTimestamp();

    return message.channel.send(embed);

    }
    
exports.help = {
        name: "hackban",
        description: "Bans the specified user. Option to add a reason.",
        usage: `hackban 166995790416314370`,
        aliases: [ 'hb' ],
        permissions: 
        [
            'BAN_MEMBERS',
        ]
    }