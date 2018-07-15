exports.run = async (client, message, args) => {
    const query = client.db;
    var res = await query(`SELECT * FROM guilds where guild_id='${message.guild.id}'`);
    if(!args[0]) {
        if(res[0]) {
            return message.channel.send(`Current prefix is: ${res[0].prefix}`)
        } else if(!res[0]) {
            return message.channel.send(`There is currently no prefix set!`);
        }
    }
   
    switch(args[0]) {
        case "clear":

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to use this command!");
        if (res[0]) {
        await query(`DELETE FROM guilds where guild_id='${message.guild.id}'`)
            return message.channel.send('Prefix cleared');
        }
        break;
        case "set":

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to use this command!");
        if(!args[1]) return message.channel.send('Please set a prefix!');

            if(res[0]) query( `UPDATE guilds SET prefix = '${args[1]}' WHERE guild_id = '${message.guild.id}'`);
            else query(`INSERT INTO guilds(guild_id, prefix) values ('${message.guild.id}', '${args[1]}')`);
            return message.channel.send(`Prefix updated to ${args[1]}`);
            break;
    }
   

}

exports.help = {
    name: "prefix",
    description: "Checks/Sets prefix.",
    usage: "prefix/ prefix set ;",
}