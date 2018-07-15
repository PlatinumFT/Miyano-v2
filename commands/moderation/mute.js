let Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!user) return message.channel.send(embedFail(`Please specify a valid user or ID!`));
    if(user.highestRole.position >= message.member.highestRole.position) return message.channel.send(embedFail('You cannot unmute a member who has a higher or the same role as you!'));

    let role = message.guild.roles.find(r => r.name == 'Tsukihi Mute');
    if(!role) {
        try {
            role = await message.guild.createRole({
                name: 'Tsukihi Mute',
                permissions: []
            });
    
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                })
            })
        } catch(e) {
            
        }
    }

    if(user.roles.has(role.id)) return message.channel.send(embedFail(`**${user}** is already muted.`));

    await user.addRole(role);
    message.channel.send(embedSuccess(`Successfully muted ${user}.`));
}


exports.help = {
    name: "mute",
    description: "Mutes the user.",
    usage: "mute @Platinum#0001",
    permissions: 
    [
        'MANAGE_MESSAGES', 'MUTE_MEMBERS'
    ]
}

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