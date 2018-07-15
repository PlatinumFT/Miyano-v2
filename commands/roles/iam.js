const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    const query = bot.db;
    let toAdd = message.author;
    let rolejoin = args.slice(0).join(' ');

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

    

    if (!args[0]) return;
    let myRole = message.guild.roles.find(val => val.name.toLowerCase() === rolejoin.toLowerCase());
    if(!myRole) return message.channel.send(embedFail(`${message.author.username}, This role does not exist!`));
    minorRole = message.guild.roles.get("298702403220537344");

    //Araragi Hard Code
    if(message.guild.id == "204487943568621568") {
        if (message.member.roles.has(minorRole.id)) {
            if (myRole.id == "206668607327961088") return message.channel.send(embedFail("You are too young to assign yourself this role!"));
        };
        var rows = await query(`SELECT * FROM roles WHERE guild_id = '${message.guild.id}'`);
        let assignNames = "";
    
        var numbRoles = rows.length;

            let roleCount=0;
        if (myRole.id == "336786415407071233" || myRole.id == "206668607327961088" || myRole.id == "271875615064326146" || myRole.id == "322165288332165121" || myRole.id == "220998153044885505" || myRole.id == "338795067097743361" || myRole.id == "418555569670979584") {
        } else {
        for(i=0;i<numbRoles;i++) {
            if (rows[i].role_id == "336786415407071233" || rows[i].role_id == "206668607327961088" || rows[i].role_id == "271875615064326146" || rows[i].role_id == "322165288332165121" || rows[i].role_id == "220998153044885505" || rows[i].role_id == "418555569670979584" || rows[i].role_id == "338795067097743361") {roleCount+=0} else {
            let userRole = message.guild.roles.find("id", rows[i].role_id);
            if (message.member.roles.has(userRole.id)) {
                roleCount+=1
                if(!myRole.id === rows[i].role_id) return message.channel.send(embedFail("This is not an assignable role!"));
            }
        }
        }
    }

    getRole(roleCount);
    } else if(message.guild.id == "403050328536121354") {
        var rows = await query(`SELECT * FROM roles WHERE guild_id = '${message.guild.id}'`);
        let assignNames = "";
    
        var numbRoles = rows.length;

            let roleCount=0;
        if (myRole.id == "403074596711956491" || myRole.id == "412080053598289922" || myRole.id == "431294268158640141" || myRole.id == "430150559421693962" || myRole.id == "438872437816295424"){

        } else {
        for(i=0;i<numbRoles;i++) {
            if (rows[i].role_id == "403074596711956491" || rows[i].role_id == "412080053598289922" || rows[i].role_id == "431294268158640141" || rows[i].role_id == "430150559421693962" || rows[i].role_id == "438872437816295424") {roleCount+=0} else {
            let userRole = message.guild.roles.find("id", rows[i].role_id);
            if (message.member.roles.has(userRole.id)) {
                roleCount+=1
                if(!myRole.id === rows[i].role_id) return message.channel.send(embedFail(`${message.author.username}, This is not an assignable role!`));
            }
        }
        }
    } 
    getRole(roleCount);
    }else {
        var rows = await query(`SELECT * FROM roles WHERE guild_id = '${message.guild.id}' AND role_id='${myRole.id}'`);        
        if(!rows[0]) return message.channel.send(embedFail("This is not an assignable role!"));
    getRole(0);
    }

    async function getRole(roleCount) {
    if(message.member.roles.has(myRole.id)) return message.channel.send(embedFail("You already have this role!"));
    let res = await query(`SELECT * FROM roles WHERE role_id='${myRole.id}' AND guild_id='${message.guild.id}';`);
    
    if(!res[0]) {
        message.channel.send(embedFail("This is not an assignable role!"));
        return;
        } else if(res[0]) {
                if(message.guild.id == "204487943568621568") {
                    if(roleCount>=2) return message.channel.send(embedFail(`${message.author.username}, You already have 2 character roles!`));                              
                }
                if(message.guild.id == "403050328536121354") {
                    if(roleCount>=2) return message.channel.send(embedFail(`${message.author.username}, You already have 2 roles!`));
                }
                try {
                message.guild.member(message.author).addRole(myRole, "Self assigned role.");
                } catch(e) {
                    return message.channel.send(e.stack);
                }

                let msg = await message.channel.send(embedSuccess(`${message.author.username}, you now have the ${myRole.name} role.`));
            }
    }
}

module.exports.help = {
    name: "iam",
    description: "Assigns one of the self assignable roles",
    usage: `iam NSFW`,
    type: "roles"    
}
